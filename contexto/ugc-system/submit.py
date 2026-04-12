#!/usr/bin/env python3
"""
WaveSpeed submission script for UGC system.

Submits a prompt JSON to WaveSpeed, polls until complete, downloads and saves result.
Reads WAVESPEED_API_KEY from .env file in the project root (or from environment).

Handles two JSON formats:
  - Old format  (full_prompt + negative_prompt at root level)
  - WaveSpeed   (provider: "wavespeed.ai", model, input)

Usage:
  python submit.py outputs/amy-bathroom-grwm-still.json
  python submit.py outputs/mia-sunscreen-poolside-kling3.json
  python submit.py outputs/amy-bathroom-grwm-still.json --model i2v --image img-referencias/amy-headshot-ref.png
  python submit.py outputs/astrid-living-room-night-still-text.json
  python submit.py outputs/astrid-living-room-night-still-text.json --image img-referencias/astrid-headshot-ref.png
  python submit.py outputs/astrid-living-room-night-still-edit.json
"""

import argparse
import hashlib
import json
import mimetypes
import os
import sys
import time
import uuid
import urllib.request
import urllib.error
from pathlib import Path

API_BASE = "https://api.wavespeed.ai/api/v3"

MODELS = {
    "image":  "google/nano-banana-2/text-to-image",
    "edit":   "google/nano-banana-2/edit",
    "t2v":    "kwaivgi/kling-v3.0-pro/text-to-video",
    "i2v":    "kwaivgi/kling-v3.0-std/image-to-video",
    "motion": "kwaivgi/kling-v3.0-pro/motion-control",
}

TASK_STATE_DIRNAME = ".wavespeed-tasks"


# ── .env loader ───────────────────────────────────────────────────────────────

def load_env(env_path: Path):
    """Load key=value pairs from a .env file into os.environ (does not override)."""
    if not env_path.exists():
        return
    with open(env_path) as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, _, value = line.partition("=")
            key = key.strip()
            value = value.strip().strip('"').strip("'")
            if key and key not in os.environ:
                os.environ[key] = value


def get_api_key(project_root: Path) -> str:
    load_env(project_root / ".env")
    key = os.environ.get("WAVESPEED_API_KEY")
    if not key:
        sys.exit(
            "Error: WAVESPEED_API_KEY not found.\n"
            "Add it to your .env file:  WAVESPEED_API_KEY=your_key_here"
        )
    return key


# ── http helpers ──────────────────────────────────────────────────────────────

def http_post(url, data, headers):
    body = json.dumps(data).encode()
    req = urllib.request.Request(url, data=body, headers=headers, method="POST")
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        sys.exit(f"HTTP {e.code}:\n{e.read().decode()}")


def http_get(url, headers):
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        sys.exit(f"HTTP {e.code} polling:\n{e.read().decode()}")


def http_post_multipart(url, file_path: Path, headers):
    boundary = f"----WaveSpeedBoundary{uuid.uuid4().hex}"
    content_type = mimetypes.guess_type(file_path.name)[0] or "application/octet-stream"

    with open(file_path, "rb") as f:
        file_bytes = f.read()

    body = (
        f"--{boundary}\r\n"
        f'Content-Disposition: form-data; name="file"; filename="{file_path.name}"\r\n'
        f"Content-Type: {content_type}\r\n\r\n"
    ).encode() + file_bytes + f"\r\n--{boundary}--\r\n".encode()

    upload_headers = dict(headers)
    upload_headers["Content-Type"] = f"multipart/form-data; boundary={boundary}"
    req = urllib.request.Request(url, data=body, headers=upload_headers, method="POST")
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        sys.exit(f"HTTP {e.code} upload:\n{e.read().decode()}")


def build_input_signature(model, input_data):
    payload = {
        "model": model,
        "input": input_data,
    }
    serialized = json.dumps(payload, sort_keys=True, ensure_ascii=True)
    return hashlib.sha256(serialized.encode()).hexdigest()


def task_state_path(json_path: Path) -> Path:
    return json_path.parent / TASK_STATE_DIRNAME / f"{json_path.stem}.json"


def upload_state_path(json_path: Path) -> Path:
    return json_path.parent / TASK_STATE_DIRNAME / f"{json_path.stem}.uploads.json"


def load_task_state(json_path: Path):
    state_path = task_state_path(json_path)
    if not state_path.exists():
        return None
    with open(state_path) as f:
        return json.load(f)


def save_task_state(json_path: Path, state: dict):
    state_path = task_state_path(json_path)
    state_path.parent.mkdir(parents=True, exist_ok=True)
    with open(state_path, "w") as f:
        json.dump(state, f, indent=2)


def clear_task_state(json_path: Path):
    state_path = task_state_path(json_path)
    if state_path.exists():
        state_path.unlink()


def load_upload_cache(json_path: Path):
    cache_path = upload_state_path(json_path)
    if not cache_path.exists():
        return {}
    with open(cache_path) as f:
        return json.load(f)


def save_upload_cache(json_path: Path, cache: dict):
    cache_path = upload_state_path(json_path)
    cache_path.parent.mkdir(parents=True, exist_ok=True)
    with open(cache_path, "w") as f:
        json.dump(cache, f, indent=2)


# ── payload builders ──────────────────────────────────────────────────────────

def from_old_format(data, model_hint):
    """Old UGC JSON with full_prompt/negative_prompt at root level."""
    prompt = (
        data.get("full_prompt")
        or data.get("prompt_stack", {}).get("full_prompt", "")
    )
    negative = data.get("negative_prompt", "")

    if not prompt:
        sys.exit("Could not find prompt in JSON. Expected 'full_prompt' field.")

    if model_hint == "image":
        return MODELS["image"], {
            "prompt": prompt,
            "aspect_ratio": "9:16",
            "resolution": "1k",
            "output_format": "png",
        }

    return MODELS["t2v"], {
        "prompt": prompt,
        "negative_prompt": negative,
        "aspect_ratio": "9:16",
        "duration": 5,
        "cfg_scale": 0.5,
        "sound": False,
        "shot_type": "customize",
    }


def from_wavespeed_format(data):
    """Use existing WaveSpeed payload directly."""
    if "wavespeed_payload" in data:
        entry = data["wavespeed_payload"]
        if isinstance(entry, list):
            entry = entry[0].get("payload", entry[0])
        model = entry.get("model", MODELS["t2v"])
        inp = dict(entry.get("input", {}))
    else:
        model = data.get("model", MODELS["t2v"])
        inp = dict(data.get("input", {}))
    return model, inp


def upload_file(file_path: Path, api_key: str):
    url = f"{API_BASE}/media/upload/binary"
    headers = {
        "Authorization": f"Bearer {api_key}",
    }
    resp = http_post_multipart(url, file_path, headers)
    data = resp.get("data", {})
    uploaded_url = data.get("download_url") or data.get("url")
    if not uploaded_url:
        sys.exit(f"Upload response missing URL:\n{json.dumps(resp, indent=2)}")
    return uploaded_url


def normalize_media_inputs(inp: dict, json_path: Path, project_root: Path, api_key: str):
    cache = load_upload_cache(json_path)
    changed = False

    def resolve_media(value):
        nonlocal changed
        if not isinstance(value, str):
            return value
        if value.startswith("http://") or value.startswith("https://"):
            return value

        file_path = Path(value)
        if not file_path.is_absolute():
            file_path = project_root / value
        if not file_path.exists():
            return value

        abs_key = str(file_path.resolve())
        cached_url = cache.get(abs_key)
        if cached_url:
            return cached_url

        print(f"  Uploading media: {file_path}")
        uploaded_url = upload_file(file_path, api_key)
        cache[abs_key] = uploaded_url
        changed = True
        return uploaded_url

    for key in ("image", "end_image", "audio"):
        if key in inp:
            inp[key] = resolve_media(inp[key])

    if "images" in inp and isinstance(inp["images"], list):
        inp["images"] = [resolve_media(item) for item in inp["images"]]

    if changed:
        save_upload_cache(json_path, cache)

    return inp


def normalize_model_inputs(model: str, inp: dict):
    """Normalize cross-model input aliases and validate required media fields."""
    if model == MODELS["edit"]:
        if "image" in inp:
            image_value = inp.pop("image")
            existing = inp.get("images", [])
            if not isinstance(existing, list):
                existing = [existing]
            inp["images"] = [image_value, *existing]
        elif "images" in inp and not isinstance(inp["images"], list):
            inp["images"] = [inp["images"]]

        if not inp.get("images"):
            sys.exit(
                "Edit model requires at least one input image.\n"
                "Provide --image or set input.images in the JSON payload."
            )

    if model == MODELS["i2v"] and not inp.get("image"):
        sys.exit(
            "Image-to-video requires a reference image.\n"
            "Provide --image or set input.image in the JSON payload."
        )

    return inp


# ── core ──────────────────────────────────────────────────────────────────────

def submit(model, input_data, api_key):
    url = f"{API_BASE}/{model}"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type":  "application/json",
    }
    resp = http_post(url, input_data, headers)
    task = resp["data"]
    task_id = task["id"]
    poll_url = task.get("urls", {}).get("get")
    print(f"  Task ID : {task_id}")
    return task_id, poll_url


def poll(task_id, api_key, interval=5, max_wait=600, poll_url=None):
    primary_url = poll_url or f"{API_BASE}/predictions/{task_id}"
    fallback_url = f"{API_BASE}/predictions/{task_id}/result"
    headers = {"Authorization": f"Bearer {api_key}"}
    elapsed = 0
    while elapsed < max_wait:
        try:
            resp = http_get(primary_url, headers)
        except SystemExit as e:
            if "HTTP 404" in str(e) and primary_url != fallback_url:
                resp = http_get(fallback_url, headers)
            else:
                raise
        status = resp["data"]["status"]
        print(f"  [{elapsed:>3}s] {status}          ", end="\r", flush=True)
        if status == "completed":
            print()
            return resp["data"]["outputs"]
        if status == "failed":
            print()
            sys.exit(f"Generation failed:\n{json.dumps(resp, indent=2)}")
        time.sleep(interval)
        elapsed += interval
    print()
    sys.exit(f"Timeout after {max_wait}s. Task {task_id} still processing.")


def download_outputs(outputs, stem, model, out_dir):
    image_models = {MODELS["image"], MODELS["edit"]}
    ext = ".png" if model in image_models else ".mp4"
    out_dir.mkdir(parents=True, exist_ok=True)
    for i, url in enumerate(outputs):
        suffix = f"_{i + 1}" if len(outputs) > 1 else ""
        dest = out_dir / f"{stem}{suffix}{ext}"
        urllib.request.urlretrieve(url, dest)
        print(f"  Saved   : {dest}")


# ── main ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Submit a UGC prompt JSON to WaveSpeed and save the result."
    )
    parser.add_argument("file", help="Path to output JSON (e.g. outputs/amy-bathroom-grwm-still.json)")
    parser.add_argument(
        "--model",
        choices=list(MODELS.keys()),
        help="Force model. Auto-detected if omitted. Options: image, edit, t2v, i2v, motion",
    )
    parser.add_argument(
        "--image",
        help="Reference image path or URL. For stills, switches to edit; for video, switches to i2v.",
    )
    parser.add_argument(
        "--force-new-task",
        action="store_true",
        help="Ignore any saved pending task for this file and create a new submission.",
    )
    args = parser.parse_args()

    project_root = Path(__file__).parent
    api_key = get_api_key(project_root)

    json_path = Path(args.file)
    if not json_path.exists():
        sys.exit(f"File not found: {json_path}")

    with open(json_path) as f:
        data = json.load(f)

    provider = data.get("provider", "")

    if provider == "wavespeed.ai" or "wavespeed_payload" in data:
        model, inp = from_wavespeed_format(data)
    else:
        # Old format — auto-detect type from filename
        auto_hint = "image" if "still" in json_path.name else "t2v"
        model, inp = from_old_format(data, args.model or auto_hint)

    requested_model = MODELS[args.model] if args.model else model

    # Inject reference image according to the requested output type.
    if args.image:
        if requested_model in {MODELS["image"], MODELS["edit"]}:
            model = MODELS["edit"]
            existing_images = inp.get("images", [])
            if not isinstance(existing_images, list):
                existing_images = [existing_images]
            inp["images"] = [args.image, *existing_images]
        else:
            model = requested_model if requested_model in {MODELS["i2v"], MODELS["motion"]} else MODELS["i2v"]
            inp["image"] = args.image
            inp.pop("sound", None)
    else:
        model = requested_model

    inp = normalize_model_inputs(model, inp)
    inp = normalize_media_inputs(inp, json_path, project_root, api_key)

    input_signature = build_input_signature(model, inp)

    print(f"\nFile    : {json_path.name}")
    print(f"Model   : {model}")
    print(f"Prompt  : {inp.get('prompt', '')[:80].replace(chr(10), ' ')}...")
    if args.image:
        print(f"Image   : {args.image}")
    print()

    saved_state = None if args.force_new_task else load_task_state(json_path)
    if saved_state and saved_state.get("input_signature") == input_signature:
        task_id = saved_state["task_id"]
        poll_url = saved_state.get("poll_url")
        print(f"  Resuming existing task: {task_id}")
    else:
        task_id, poll_url = submit(model, inp, api_key)
        save_task_state(json_path, {
            "task_id": task_id,
            "poll_url": poll_url,
            "model": model,
            "input_signature": input_signature,
        })

    try:
        outputs = poll(task_id, api_key, poll_url=poll_url)
    except BaseException:
        print("\nTask preserved for resume. Re-run the same command to continue polling.")
        raise

    download_outputs(outputs, json_path.stem, model, json_path.parent / "media")
    clear_task_state(json_path)

    print("\nDone.")


if __name__ == "__main__":
    main()
