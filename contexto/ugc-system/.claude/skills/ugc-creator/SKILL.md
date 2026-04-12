---
name: ugc-creator
description: Use when the user wants hyper-realistic AI UGC photos or videos with locked actor identity, iPhone-style camera behavior, multi-shot consistency, creator-shot planning, or WaveSpeed prompt packages (Kling 3.0 Pro/Std video, Nano Banana 2 image gen) for selfie, mirror, rear-camera, and flatlay content.
---

# UGC Creator

## Studio Contract
```json
{
  "skill_id": "ugc-creator",
  "role": "hyper_realistic_ai_ugc_studio",
  "objective": "Generate ultra-believable UGC image and video prompt packages that preserve actor identity, iPhone capture language, creator-style imperfection, and cross-shot continuity.",
  "default_workflow": [
    "build_or_load_actor_identity_card",
    "if_no_reference_headshot_offer_to_generate_one",
    "pick_shot_type_and_camera_profile",
    "assemble_6_layer_prompt_stack",
    "inject_realism_engine_anchors",
    "if_video_apply_kling_emotion_engine_layers",
    "prepare_wavespeed_payload",
    "run_multi_shot_consistency_protocol"
  ],
  "non_negotiables": [
    "Never generate without an actor_identity_card.",
    "Never omit the 10 realism anchors.",
    "Never change actor-defining facial traits between shots in the same set.",
    "Never use generic beauty-language like flawless, perfect skin, pristine lighting, studio-clean frame, or ideal symmetry unless the user explicitly asks for stylization.",
    "Always output prompts as locked structured blocks before prose.",
    "Always assume handheld consumer capture, not commercial polish, unless the user overrides it.",
    "Always open camera layer with Candid UGC iPhone capture convention and include no portrait mode, no bokeh unless user overrides.",
    "For any video prompt with emotional performance: always open with camera_lock line from kling_emotion_engine. Never describe emotion as abstract feeling — always as physical muscle movement.",
    "For emotion videos: always close prompt with ugc_template tech_footer. Never leave camera lock implicit."
  ],
  "deliverables": [
    "actor_identity_card",
    "actor_reference_headshot_payload",
    "shot_plan",
    "prompt_stack",
    "negative_prompt",
    "wavespeed_payload",
    "continuity_ledger"
  ]
}
```

## Actor System
```json
{
  "actor_system": {
    "required_schema": {
      "actor_id": "string_slug_versioned",
      "display_name": "string",
      "prompt_seed": "string_or_integer_fixed_across_series",
      "face": {
        "shape": "string",
        "forehead": "string",
        "nose": "string",
        "lips": "string",
        "cheek_structure": "string",
        "jawline": "string"
      },
      "eyes": {
        "shape": "string",
        "color": "string",
        "spacing": "string",
        "upper_lid": "string",
        "lower_lid": "string",
        "lash_density": "string",
        "brow_shape": "string"
      },
      "skin": {
        "tone_hex": "#RRGGBB",
        "undertone": "string",
        "base_texture": "string",
        "freckling": "string",
        "under_eye_texture": "string",
        "pigmentation_pattern": "string"
      },
      "hair": {
        "color": "string",
        "style": "string",
        "length": "string",
        "density": "string",
        "parting": "string",
        "flyaway_pattern": "string"
      },
      "distinguishing_marks": [
        "string"
      ],
      "reference_headshot_file": "optional_path_or_url_to_generated_passport_headshot",
      "outfit_variations": [
        {
          "look_id": "string",
          "top": "string",
          "bottom": "string",
          "layer": "string",
          "accessories": [
            "string"
          ],
          "color_story": [
            "string"
          ]
        }
      ],
      "identity_lock": {
        "must_match": [
          "face.shape",
          "face.jawline",
          "eyes.shape",
          "eyes.color",
          "skin.tone_hex",
          "hair.color",
          "distinguishing_marks",
          "prompt_seed"
        ],
        "may_vary": [
          "expression",
          "pose",
          "outfit_variations",
          "hand_position",
          "background_micro_details",
          "jewelry_choice_if_defined_in_outfit_variations"
        ],
        "must_not_drift": [
          "nose_geometry",
          "lip_volume",
          "mole_or_mark_position",
          "tooth_shape_if_visible",
          "brow_thickness",
          "ear_shape_if_visible"
        ]
      }
    },
    "identity_card_template": {
      "actor_id": "maya_softlight_v1",
      "display_name": "Maya",
      "prompt_seed": "ugc_maya_seed_48192",
      "face": {
        "shape": "soft oval face with subtle cheek fullness",
        "forehead": "medium height with slight asymmetry near hairline",
        "nose": "straight narrow bridge with softly rounded tip",
        "lips": "defined cupid bow, fuller lower lip, natural edge texture",
        "cheek_structure": "gentle mid-cheek volume, not sculpted",
        "jawline": "soft tapered jawline with visible but non-sharp mandibular contour"
      },
      "eyes": {
        "shape": "almond eyes with slight downward outer tilt",
        "color": "deep brown",
        "spacing": "balanced natural spacing",
        "upper_lid": "slightly hooded",
        "lower_lid": "soft under-eye fold with mild texture",
        "lash_density": "natural medium density",
        "brow_shape": "low-arched full brows with uneven edge hairs"
      },
      "skin": {
        "tone_hex": "#C6865B",
        "undertone": "warm neutral",
        "base_texture": "visible pores on nose and inner cheeks",
        "freckling": "subtle scattered micro freckles across upper cheek",
        "under_eye_texture": "fine creasing and slight violet shadow",
        "pigmentation_pattern": "slight redness around nostrils and uneven cheek tone"
      },
      "hair": {
        "color": "dark chestnut brown",
        "style": "loose shoulder-length blowout with imperfect bend",
        "length": "just below shoulders",
        "density": "medium-high density",
        "parting": "off-center left",
        "flyaway_pattern": "consistent short halo hairs around crown and temples"
      },
      "distinguishing_marks": [
        "small flat mole on right cheek near nose line",
        "slight lip asymmetry when smiling",
        "tiny scar notch in left eyebrow tail"
      ],
      "outfit_variations": [
        {
          "look_id": "neutral_lounge",
          "top": "heather gray ribbed tank",
          "bottom": "cream lounge shorts",
          "layer": "oversized oatmeal cardigan",
          "accessories": [
            "thin gold hoop earrings",
            "simple gold ring stack"
          ],
          "color_story": [
            "gray",
            "cream",
            "oatmeal",
            "soft gold"
          ]
        },
        {
          "look_id": "bathroom_grwm",
          "top": "washed black fitted tee",
          "bottom": "light denim",
          "layer": "none",
          "accessories": [
            "silver huggies",
            "black hair tie on wrist"
          ],
          "color_story": [
            "black",
            "denim blue",
            "silver"
          ]
        }
      ]
    }
  }
}
```

## Realism Engine
```json
{
  "realism_engine": {
    "mandatory_anchors": [
      {
        "anchor": "skin_pores",
        "required": true,
        "instruction": "Show real pore breakup on nose, inner cheeks, and chin without smoothing."
      },
      {
        "anchor": "stray_hairs",
        "required": true,
        "instruction": "Include flyaways, baby hairs, and small irregular strand separation."
      },
      {
        "anchor": "under_eye_texture",
        "required": true,
        "instruction": "Preserve fine creases, slight puffiness, and realistic under-eye tonal variation."
      },
      {
        "anchor": "uneven_skin_tone",
        "required": true,
        "instruction": "Add mild redness, olive-gray shadows, pigmentation variation, and non-uniform complexion zones."
      },
      {
        "anchor": "fabric_texture",
        "required": true,
        "instruction": "Render knit weave, cotton fuzz, stretch tension, wrinkles, and seam behavior."
      },
      {
        "anchor": "environmental_noise",
        "required": true,
        "instruction": "Retain room clutter logic, sensor grain, air haze, dust, or compression noise when plausible."
      },
      {
        "anchor": "lighting_imperfection",
        "required": true,
        "instruction": "Allow mixed color temperature, partial falloff, blown micro-highlights, and shadow inconsistency."
      },
      {
        "anchor": "camera_artifacts",
        "required": true,
        "instruction": "Inject lens smudge hints, rolling sharpness inconsistency, compression, slight denoise warble, or local sharpening halos."
      },
      {
        "anchor": "nail_detail",
        "required": true,
        "instruction": "Hands must show cuticle texture, nail bed shape, minor asymmetry, and realistic polish wear if present."
      },
      {
        "anchor": "jewelry_physics",
        "required": true,
        "instruction": "Jewelry must hang, twist, reflect, and shift with gravity and motion rather than float statically."
      }
    ],
    "injection_rule": "Every final prompt must contain all 10 anchors explicitly or via a generated realism_injection block.",
    "context_awareness": {
      "real_world_logic": true,
      "physics_accurate": true,
      "instruction": "Apply real-world physics to all elements: light behaves correctly, skin texture follows biological rules, fabric follows gravity, jewelry follows inertia. Never apply stylized or idealized rendering unless explicitly requested."
    },
    "imperfection_vocabulary": {
      "framing": [
        "subject slightly off-center",
        "too much headroom",
        "accidental crop on forehead or chin",
        "camera slightly tilted",
        "slightly too close framing",
        "hands partially cropped",
        "imperfect framing asymmetrical composition"
      ],
      "movement": [
        "slightly shaky framing",
        "motion blur on hands",
        "slight motion blur from handheld shot",
        "camera tilt from movement",
        "imperfect focus from motion",
        "hair drift from micro movement"
      ],
      "physical_subject": [
        "crumb on lip",
        "hair messy from wind",
        "sweaty face with forehead shine",
        "tired eyes with mild puffiness",
        "slight shine on nose bridge",
        "natural oily skin reflectivity",
        "eyeliner slightly uneven",
        "smudged mascara under lower lid"
      ],
      "environment": [
        "crowds visible behind in deep focus",
        "objects partially blocking frame",
        "messy background clutter",
        "cables or chargers visible",
        "laundry basket in corner",
        "random objects on counter",
        "slightly non-stylized environment"
      ],
      "device": [
        "subtle grain",
        "mild compression artifacts",
        "mild jpeg artifacts",
        "slight exposure imbalance",
        "uneven dynamic range",
        "highlight clipping from bright window",
        "compression macroblocking in darker areas",
        "slight denoise smoothing on skin",
        "auto exposure shift mid-frame",
        "social media upload quality degradation"
      ],
      "lighting": [
        "uneven shadows on face",
        "harsh top light creating under-eye shadows",
        "overexposed highlights near window",
        "mixed color temperature warm plus cool",
        "slight yellow tint from ceiling light",
        "slight greenish tint from fluorescent",
        "backlit underexposure on subject",
        "unwanted light reflection or glare spot",
        "uneven background illumination"
      ]
    },
    "ban_list": [
      "airbrushed skin",
      "perfectly symmetrical hairline",
      "uniform studio lighting unless requested",
      "immaculate wrinkle-free clothing in casual UGC contexts",
      "floating jewelry",
      "oversharpened porcelain skin",
      "CGI-clean backgrounds with zero micro-noise",
      "perfect bokeh from large sensor unless requested",
      "DSLR cinematic look unless requested",
      "editorial fashion vibe unless requested"
    ]
  }
}
```

## iPhone Camera Simulation
```json
{
  "iphone_camera_profiles": {
    "selfie_front_cam": {
      "use_case": "direct-to-camera talking UGC, arm-length testimonials, casual GRWM",
      "opening_convention": "Candid UGC iPhone selfie (no portrait mode, no bokeh):",
      "lens_equivalent": "26mm_full_frame_equivalent_front_sim",
      "framing_bias": "head_and_shoulders_or_mid_torso at arm-length perspective",
      "distortion": "mild edge facial stretch and forearm exaggeration",
      "focus_behavior": "face-priority with occasional background pumping, deep focus smartphone look",
      "dynamic_range": "consumer_hdr with slight halo around windows",
      "noise_profile": "fine luminance noise in shadows, stronger after compression",
      "white_balance": "slight warm/cool drift depending on ambient mixed light",
      "imperfections": [
        "skin sharpening around eyes",
        "hair detail breakup",
        "minor motion blur on hands",
        "wide-angle distortion on arm",
        "slight tilt from handheld",
        "mild compression artifacts"
      ]
    },
    "rear_cam": {
      "use_case": "product demos, room walkthroughs, casual b-roll, friend-shot lifestyle angles",
      "opening_convention": "Candid smartphone snapshot (no portrait mode, no bokeh):",
      "lens_equivalent": "24mm_to_28mm_phone_rear_sim",
      "framing_bias": "cleaner geometry than selfie but still handheld and informal",
      "distortion": "subtle wide-angle room stretch near frame edges",
      "focus_behavior": "tap-focus behavior with occasional hunting during motion",
      "dynamic_range": "better highlight retention than front cam but still imperfect",
      "noise_profile": "shadow noise and compression macroblocking in darker interiors",
      "white_balance": "leans neutral with occasional fluorescent green contamination",
      "imperfections": [
        "micro-jitter from handheld movement",
        "lens flare streaks near practicals",
        "local sharpening on fabric edges"
      ]
    },
    "mirror_selfie": {
      "use_case": "bathroom testimonials, outfit callouts, product-in-hand vanity shots",
      "opening_convention": "Candid UGC mirror selfie (no portrait mode, no bokeh):",
      "lens_equivalent": "mirror_capture_of_phone_screen_or_rear_module",
      "framing_bias": "phone visible, body angled, face partially occluded or reflected",
      "distortion": "mirror depth ambiguity and slight perspective mismatch",
      "focus_behavior": "mirror plane sharpness with phone or face competing for attention",
      "dynamic_range": "bathroom hotspot rolloff and practical-light clipping",
      "noise_profile": "glass smudge softness and subtle sensor grain",
      "white_balance": "mixed bathroom lighting with warm vanity and cool overhead conflict",
      "imperfections": [
        "mirror streaks or dust hints",
        "specular hotspot on tile or faucet",
        "phone edge reflections and exposure pumping",
        "smudged mirror surface from fingerprints"
      ]
    },
    "overhead_flatlay": {
      "use_case": "countertop routines, desk product layouts, unboxing surfaces, skincare spreads",
      "opening_convention": "Overhead UGC phone flatlay (no portrait mode):",
      "lens_equivalent": "26mm_phone_overhead_sim",
      "framing_bias": "top-down with slight hand shadow drift and imperfect alignment",
      "distortion": "subtle corner pull and object size falloff away from center",
      "focus_behavior": "surface-priority with depth softness on raised objects",
      "dynamic_range": "tabletop practicals, window streaks, and hard specular reflections",
      "noise_profile": "fine grain and texture retention on matte surfaces",
      "white_balance": "surface color cast strongly influences overall tone",
      "imperfections": [
        "crooked layout edges",
        "real dust or crumb logic if appropriate",
        "fingerprint smears on glossy packaging"
      ]
    },
    "pov_cam": {
      "use_case": "first-person perspective content — seated lifestyle, walking, product interaction from subject viewpoint",
      "opening_convention": "First-person POV smartphone camera (no portrait mode, no bokeh):",
      "lens_equivalent": "phone_rear_cam_pov_sim",
      "framing_bias": "landscape or subject ahead from creator viewpoint, body elements may appear at frame edge",
      "distortion": "slight wide-angle distortion, natural perspective",
      "focus_behavior": "subject-ahead priority with casual hunting",
      "dynamic_range": "exposure shifts between bright and shadow zones in scene",
      "noise_profile": "subtle grain, social media compression",
      "white_balance": "auto white balance drift based on scene",
      "imperfections": [
        "slight motion from walking or movement",
        "imperfect framing, horizon slightly tilted",
        "hands partially visible at frame edge if handheld",
        "knees visible at bottom if seated POV"
      ],
      "pov_variants": {
        "pov_seated_knees": "first-person POV from a seated person, knees visible at the bottom of the frame, legs slightly apart, casual relaxed posture",
        "pov_normal": "first-person POV, no body visible, no hands visible, natural perspective of what the creator sees",
        "pov_hands_visible": "first-person POV, both hands partially visible holding the phone at the bottom of the frame, looking forward"
      }
    }
  }
}
```

## Prompt Stack
```json
{
  "prompt_system": {
    "layer_order": [
      "character_lock",
      "scenario",
      "environment",
      "camera",
      "realism_injection",
      "negative_prompt"
    ],
    "layer_definitions": {
      "character_lock": {
        "purpose": "Hard-lock actor identity from the JSON card.",
        "must_include": [
          "actor_id",
          "prompt_seed",
          "face.shape",
          "face.jawline",
          "eyes.shape",
          "eyes.color",
          "skin.tone_hex",
          "hair.color",
          "hair.parting",
          "distinguishing_marks"
        ],
        "template": "Actor lock: {display_name}, seed {prompt_seed}, {face.shape}, {face.jawline}, {eyes.shape} {eyes.color} eyes, skin tone {skin.tone_hex} {skin.undertone}, hair {hair.color} {hair.style} parted {hair.parting}, marks: {distinguishing_marks}."
      },
      "scenario": {
        "purpose": "State what the creator is doing and why the frame exists. Use human_action_library vocabulary for gesture and expression fields.",
        "must_include": [
          "product_or_topic",
          "gesture",
          "expression",
          "spoken_or_implied_hook",
          "ugc_intent"
        ],
        "template": "Scenario: {display_name} is {gesture} while {ugc_intent}; expression is {expression}; implied line: {spoken_or_implied_hook}.",
        "gesture_and_expression_draw_from": "human_action_library"
      },
      "environment": {
        "purpose": "Make the space feel lived-in and specific. Reference scene_presets for pre-calibrated environment combos.",
        "must_include": [
          "room_type",
          "surface_materials",
          "background_objects",
          "time_of_day",
          "ambient_light_sources"
        ],
        "template": "Environment: {room_type}, {surface_materials}, visible {background_objects}, {time_of_day}, lit by {ambient_light_sources}."
      },
      "camera": {
        "purpose": "Encode iPhone capture language. Always open with camera_profile opening_convention.",
        "must_include": [
          "camera_profile",
          "opening_convention",
          "distance",
          "angle",
          "framing",
          "motion_style",
          "focus_behavior"
        ],
        "template": "{opening_convention} {distance}, {angle}, {framing}, motion {motion_style}, focus behavior {focus_behavior}.",
        "rule": "opening_convention from iphone_camera_profiles must appear first in this layer"
      },
      "realism_injection": {
        "purpose": "Force hyper-real physical detail. Include real_world_logic and physics_accurate flags.",
        "must_include": [
          "all_10_realism_anchors",
          "context_awareness_flags"
        ],
        "template": "Realism injection: visible skin pores, stray hairs, under-eye texture, uneven skin tone, fabric texture, environmental noise, lighting imperfection, camera artifacts, nail detail, jewelry physics. Real-world physics apply throughout."
      },
      "negative_prompt": {
        "purpose": "Reject fake-looking outputs.",
        "must_include": [
          "beauty_filter_language",
          "cg_skin",
          "symmetry_bias",
          "studio_polish",
          "floating_accessories",
          "extra_fingers",
          "anatomy_drift",
          "identity_drift",
          "portrait_mode_blur",
          "dslr_cinematic"
        ],
        "template": "Negative prompt: beauty filter, porcelain skin, plastic CG texture, over-symmetry, glamour lighting, ad-studio polish, floating jewelry, bad hands, extra fingers, warped anatomy, actor identity drift, duplicate features, overbloom, fake bokeh, portrait mode blur, DSLR cinematic look, editorial fashion vibe, perfect composition, perfectly calibrated colors."
      }
    },
    "assembly_rule": "Concatenate layers in order. Character lock always first. Negative prompt always last. Never place scenario before character lock. Camera layer must open with opening_convention string.",
    "compression_rule": "If the target model has a prompt limit, preserve layer order and trim environment adjectives first, never identity locks or realism anchors.",
    "simplified_entry_formula": "For quick single shots: Candid UGC iPhone selfie (no portrait mode, no bokeh): [location], [human action from human_action_library], [environment details], [camera imperfections from imperfection_vocabulary], [smartphone characteristics]. Expand to full 6-layer stack for series or identity-locked batches."
  }
}
```

## Human Action Library
```json
{
  "human_action_library": {
    "purpose": "Vocabulary bank for the scenario layer gesture and expression fields. Always draw from here instead of inventing generic language.",
    "gestures": {
      "product_interaction": [
        "holding product up toward camera",
        "applying product to skin with fingertips",
        "opening package with one hand",
        "pointing at product label",
        "squeezing tube with visible hand tension",
        "holding product at arm length examining it",
        "smelling product with eyes slightly closed"
      ],
      "self_grooming": [
        "adjusting hair behind ear",
        "fixing hair with both hands",
        "touching face lightly with fingertips",
        "applying lip balm",
        "adjusting shirt collar",
        "pulling down hoodie hem",
        "running fingers through hair while thinking"
      ],
      "casual_body_language": [
        "leaning forward toward camera to emphasize point",
        "hand gesturing while talking",
        "looking up or to the side while remembering something",
        "weight shifted to one side casual posture",
        "natural slouch against couch or wall",
        "arms crossed loosely",
        "one hand on hip confident stance"
      ],
      "reaction_and_emotion": [
        "mid-laugh with eyes slightly closed",
        "surprised open mouth reacting to product",
        "excited pointing at something off-frame",
        "covering mouth while laughing",
        "eyebrows raised in disbelief",
        "shaking head slowly in approval",
        "biting lower lip thinking"
      ]
    },
    "expressions": {
      "authentic_positive": [
        "mid-laugh expression",
        "candid smile between words",
        "soft genuine smile not posed",
        "relaxed happy face",
        "excited eyes with natural crinkle"
      ],
      "neutral_and_candid": [
        "mid-sentence mouth slightly open",
        "natural resting face between expressions",
        "slightly tired but present expression",
        "pensive look slightly off-camera",
        "candid unposed face caught between moments"
      ],
      "physical_realism": [
        "slight shine on forehead from indoor warmth",
        "subtle under-eye shadows from tired day",
        "slight redness on nose tip",
        "natural oily skin sheen on T-zone",
        "wind-messed hair around face"
      ]
    },
    "imperfect_physical_details": [
      "crumb on lip",
      "hair messy from wind",
      "smudged mascara under lower lid",
      "sweaty face with natural shine",
      "tired eyes with mild puffiness",
      "eyeliner slightly uneven",
      "hair static flyaways on temples"
    ]
  }
}
```

## UGC Shot Types
```json
{
  "ugc_shot_types": [
    {
      "shot_type": "talking_selfie_testimonial",
      "best_camera_profile": "selfie_front_cam",
      "purpose": "Direct recommendation, pain-point hook, or product reaction.",
      "mandatory_elements": [
        "arm-length perspective",
        "eye contact with lens",
        "slight handheld sway",
        "authentic mouth asymmetry"
      ]
    },
    {
      "shot_type": "mirror_selfie_reveal",
      "best_camera_profile": "mirror_selfie",
      "purpose": "Outfit, beauty, skincare, or lifestyle reveal with phone visible.",
      "mandatory_elements": [
        "phone present in reflection",
        "bathroom_or_bedroom logic",
        "practical-light hotspots",
        "non-perfect posture"
      ]
    },
    {
      "shot_type": "rear_cam_product_demo",
      "best_camera_profile": "rear_cam",
      "purpose": "Hand-held demo with product interaction and surface context.",
      "mandatory_elements": [
        "product contact with hands",
        "focus breathing during motion",
        "fabric or countertop texture",
        "casual room background"
      ]
    },
    {
      "shot_type": "bed_couch_reaction",
      "best_camera_profile": "selfie_front_cam",
      "purpose": "Low-pressure confession, review, or emotional reaction capture.",
      "mandatory_elements": [
        "soft furniture compression",
        "blanket_or_pillow texture",
        "messy background realism",
        "natural slouch"
      ]
    },
    {
      "shot_type": "bathroom_grwm",
      "best_camera_profile": "mirror_selfie",
      "purpose": "Get-ready flow, beauty routine, or before-after style content.",
      "mandatory_elements": [
        "mirror or vanity context",
        "mixed bathroom lighting",
        "counter clutter logic",
        "hair and skin imperfection visibility"
      ]
    },
    {
      "shot_type": "walk_and_talk_lifestyle",
      "best_camera_profile": "rear_cam",
      "purpose": "Creator moving through kitchen, hallway, sidewalk, or living room with casual narrative energy.",
      "mandatory_elements": [
        "motion blur pockets",
        "footfall timing or stride implication",
        "background parallax",
        "slight exposure changes"
      ]
    },
    {
      "shot_type": "overhead_flatlay_unboxing",
      "best_camera_profile": "overhead_flatlay",
      "purpose": "Hands-only or partial-body top-down product storytelling.",
      "mandatory_elements": [
        "nail detail",
        "package edge wear or fingerprints",
        "crooked object placement",
        "surface crumbs, dust, or textile fibers when plausible"
      ]
    },
    {
      "shot_type": "pov_lifestyle",
      "best_camera_profile": "pov_cam",
      "purpose": "First-person perspective showing what the creator sees: seated moments, walking, product in hand from their viewpoint.",
      "mandatory_elements": [
        "first-person perspective established clearly",
        "natural camera movement with scene",
        "imperfect horizon and framing",
        "wide-angle distortion from phone lens"
      ],
      "variant_selection": "Choose pov_seated_knees for relaxed home moments, pov_normal for pure landscape or environment views, pov_hands_visible for active product handling"
    }
  ]
}
```

## Scene Presets
```json
{
  "scene_presets": {
    "purpose": "Pre-calibrated environment combos for the environment and camera layers. Pull a preset and fill in actor + scenario on top.",
    "presets": [
      {
        "preset_id": "home_universal",
        "environment": "casual home interior, mixed indoor lighting, slightly cluttered background with everyday objects",
        "camera_modifiers": "slight tilt, uneven exposure, subtle grain, social media compression artifacts",
        "light_profile": "mixed ceiling light plus window ambient, no studio setup"
      },
      {
        "preset_id": "bedroom_low_light",
        "environment": "bedroom with messy bed and soft pillows visible, warm ceiling light, low ambient",
        "camera_modifiers": "smartphone noise, slight blur, imperfect focus, warm color cast",
        "light_profile": "warm ceiling light tint, low light conditions"
      },
      {
        "preset_id": "bathroom_vanity",
        "environment": "bathroom with vanity or wall mirror, counter clutter with products, tiles or painted wall",
        "camera_modifiers": "harsh top light, slightly yellow tint, flat shadows, wide-angle distortion, subtle grain",
        "light_profile": "harsh overhead bathroom lighting creating under-eye shadows"
      },
      {
        "preset_id": "kitchen_life",
        "environment": "kitchen with fridge and cabinets visible in background, countertop clutter",
        "camera_modifiers": "indoor ambient light plus window light, uneven shadows, slight highlight clipping",
        "light_profile": "mixed daylight from window and ceiling fluorescent"
      },
      {
        "preset_id": "car_interior",
        "environment": "car interior, driver or passenger seat, dashboard and seatbelt visible, window with outdoor background",
        "camera_modifiers": "daylight through windshield, uneven lighting across face, dashboard reflections, highlight clipping",
        "light_profile": "uneven directional daylight from windshield and side windows"
      },
      {
        "preset_id": "couch_living_room",
        "environment": "living room couch, warm lamp nearby, bookshelf or TV in background, slightly lived-in space",
        "camera_modifiers": "warm tungsten lamp on one side, natural light from window on other, imperfect uneven lighting",
        "light_profile": "mixed warm lamp plus ambient daylight"
      },
      {
        "preset_id": "gym_cold_light",
        "environment": "gym interior with equipment visible in background, polished floor or rubber matting",
        "camera_modifiers": "cool fluorescent lighting, slight greenish tint, uneven shadows, subtle sweat shine",
        "light_profile": "cool fluorescent overhead gym lighting"
      },
      {
        "preset_id": "outdoor_harsh_sun",
        "environment": "outdoor location under direct sun, environment-specific background, blue sky or shade nearby",
        "camera_modifiers": "strong direct sunlight, high contrast, slightly overexposed highlights, minor lens flare",
        "light_profile": "harsh direct sunlight with strong shadows"
      },
      {
        "preset_id": "outdoor_overcast",
        "environment": "outdoor location under cloudy sky, soft diffused daylight, no strong shadows",
        "camera_modifiers": "flat natural lighting, muted colors, no harsh shadows, slightly desaturated",
        "light_profile": "overcast diffused daylight"
      },
      {
        "preset_id": "night_bar_warm",
        "environment": "bar or restaurant, warm ambient lighting, string lights or neon in background, table or bar top foreground",
        "camera_modifiers": "dim warm ambient, mixed light sources, low-light smartphone grain, slight motion blur",
        "light_profile": "warm tungsten mixed with dim ambient, low light conditions"
      },
      {
        "preset_id": "aesthetic_clinic",
        "environment": "modern aesthetic clinic or spa, clean white walls and neutral decor, treatment chair or reception area",
        "camera_modifiers": "bright ceiling lights mixed with soft window light, slightly overexposed highlights, auto white balance",
        "light_profile": "clean bright medical-aesthetic lighting"
      },
      {
        "preset_id": "elevator_metal",
        "environment": "elevator with reflective metal walls and visible buttons, cramped space",
        "camera_modifiers": "harsh overhead lighting, slightly overexposed highlights, imperfect framing, slight tilt",
        "light_profile": "harsh overhead elevator lighting with reflective surfaces"
      }
    ]
  }
}
```

## Quick Adjustment Controls
```json
{
  "quick_adjustments": {
    "purpose": "Incremental modifiers to dial authenticity up or down within a prompt. Apply these additions to the camera and realism_injection layers.",
    "sliders": {
      "more_amateur": {
        "add": [
          "slight motion blur",
          "imperfect focus",
          "messy background clutter",
          "compression artifacts",
          "uneven exposure",
          "horizon slightly tilted",
          "stronger jpeg artifacts"
        ]
      },
      "more_real_social_media": {
        "add": [
          "vertical 9:16 framing",
          "social media upload quality",
          "mild jpeg artifacts from platform compression",
          "slightly washed colors after upload"
        ]
      },
      "more_ugly_but_authentic": {
        "add": [
          "harsh top light casting under-eye shadows",
          "yellow tint from ceiling light",
          "mixed color temperature conflict",
          "highlight clipping near windows"
        ]
      },
      "more_phone_hdr": {
        "add": [
          "smartphone HDR look",
          "lifted shadows plus highlight clipping",
          "over-processed auto exposure",
          "slightly punchy color from HDR algorithm"
        ]
      },
      "more_believable_natural": {
        "keep": [
          "subtle grain",
          "realistic skin texture",
          "not overly sharp",
          "visible pores",
          "imperfect but not broken framing"
        ]
      },
      "less_amateur_more_clean": {
        "remove": [
          "heavy motion blur",
          "excessive grain",
          "extreme tilt",
          "broken framing"
        ],
        "keep": [
          "natural skin texture",
          "slight wide-angle distortion",
          "mild compression"
        ]
      }
    }
  }
}
```

## Video Realism Library
```json
{
  "video_realism_library": {
    "purpose": "Vocabulary and behavior rules for the WaveSpeed Kling 3.0 motion layer. Apply these to supplement the wavespeed_payload motion_rules.",
    "facial_micro_motion": [
      "subtle facial motion with natural micro-expressions",
      "realistic blink cadence not synchronized or robotic",
      "slight jaw movement during implied speech",
      "natural head micro-corrections during talking",
      "imperfect lip timing on speech frames"
    ],
    "body_motion": [
      "natural body sway with casual gestures",
      "leans forward toward camera to emphasize point then settles back",
      "runs fingers through hair while thinking",
      "looks up or to the side momentarily while remembering",
      "hands gesturing expressively in front of chest",
      "weight shift mid-sentence",
      "natural breath movement in torso"
    ],
    "camera_motion": [
      "handheld camera shake with slight jitter",
      "imperfect stabilization drift",
      "camera reframing mid-shot with small corrections",
      "sudden micro-corrections from handheld hold",
      "camera shaking rhythm following walking stride"
    ],
    "device_behavior": [
      "smartphone video quality with compressed footage",
      "video noise and grain in motion especially low light",
      "inconsistent frame rate impression from phone processing",
      "auto-exposure adjustment mid-shot brightening or darkening",
      "brightness pulsing from exposure hunting",
      "quick autofocus hunting during subject movement"
    ],
    "editing_realism": [
      "abrupt start with no fade-in",
      "natural pauses in speech rhythm",
      "no jump cuts or cinematic editing",
      "uneven pacing typical of unedited phone video"
    ],
    "scene_specific_motion": {
      "talking_head": "Eyebrows moving expressively, unscripted genuine energy, like FaceTiming a close friend, raw footage aesthetic.",
      "walking_vlog": "Camera shaking follows person's walking rhythm, movement background with parallax, auto-exposure shifting between sun and building shadows.",
      "candid_bar_capture": "Person never looking at camera, animated conversation, handheld camera shifts angle with subtle shakes and drifts, exposure and focus changes slightly during scene.",
      "bed_couch": "Soft furniture compression visible with micro movement, slow natural breathing motion, casual repositioning."
    }
  }
}
```

## Kling Emotion Engine
```json
{
  "kling_emotion_engine": {
    "purpose": "Framework for controlling emotional performance in Kling 3.0 video generation. Apply this system whenever a UGC video requires a specific facial expression, emotional reaction, or talking-head performance.",
    "core_principle": "Describe muscles, not moods. Describe escalation, not states. Kling 3 cannot interpret 'angry' reliably, but it can animate specific muscle contractions.",
    "video_prompt_anatomy": {
      "layer_1_camera_lock": {
        "rule": "ALWAYS start every emotion prompt with this line. It is the single most important instruction.",
        "template": "Camera holds locked in this [shot_type: over-the-shoulder / medium close-up / tight close-up] with slight handheld micro-sway only. No zoom, no dolly, no push-in.",
        "why": "Without it, Kling defaults to cinematic zooming or pushing forward. This kills emotional performance because the viewer's attention follows the camera instead of the actor's micro-expressions. Locking the camera forces all visual energy into the facial performance.",
        "ugc_adaptation": "Replace cinematic shot types with UGC equivalents: arm-length selfie framing / mirror selfie framing / casual rear-cam medium shot"
      },
      "layer_2_scene_anchor": {
        "rule": "Ground the AI in specific physical reality before describing any emotion.",
        "template": "The [character_description], [position in frame], [other_elements such as background or second person silhouette].",
        "why": "The more specific your scene description, the more grounded and believable the output. Without context, the emotion feels disconnected and unmotivated.",
        "ugc_adaptation": "Use actor_identity_card character_lock data here. Reference outfit_variations.look_id."
      },
      "layer_3_emotion_cascade": {
        "rule": "Describe emotion as physical muscle movement in escalating waves. Never use abstract emotion words alone.",
        "template": "[emotion_name] [overtakes/consumes/seizes] their face in [escalating waves / a single violent instant / slow unstoppable progression]. [Primary_cue]. [Secondary_cue].",
        "escalation_words": ["overtakes", "consumes", "seizes", "deepening every second", "in escalating waves", "builds slowly and deliberately", "in a single violent instant"],
        "why": "The word 'escalating' instructs the model to build intensity progressively over the duration of the clip rather than holding a single static expression. This creates the feeling of watching a real emotion unfold in real time."
      },
      "layer_4_micro_expressions": {
        "rule": "Add involuntary physiological details. These are what separate AI video that passes as real from AI video that looks obviously generated.",
        "categories": {
          "eyes": "narrow into slits / flood with moisture / dilate to maximum / pupils dart rapidly scanning",
          "mouth": "lip curls exposing teeth / lip trembles / jaw drops / mouth tries to form response",
          "skin": "flushes crimson / sweat glistens / tears trace wet tracks / color drains from face",
          "breathing": "exhales heavier and more aggressive / fractures into shuddering rhythms / hyperventilation rapid shallow bursts"
        },
        "why": "Our brains are extraordinarily sensitive to facial authenticity. We unconsciously scan for veins pulsing at the temple, nostrils flaring with heavy breathing, sweat forming on the forehead, skin color shifting with blood flow. Each micro-detail gives Kling another specific anchor point for realistic animation."
      },
      "layer_5_body_language": {
        "rule": "Extend the emotion below the chin. Emotion never lives only in the face.",
        "template": "[Posture: shoulders squaring / caving / rounding]. [Hands: fists clench / fingers tremble / grip tightens]. [Head: chin juts forward / recoils backward / drops fractionally].",
        "why": "If you only describe the face, the result looks like a floating head performing emotions while the torso stays frozen and lifeless. The body is what sells the performance as real."
      },
      "layer_6_lighting_match": {
        "rule": "Video prompt lighting must precisely match the source image lighting.",
        "template": "[primary_light: warm ambient lamp / window light / vanity light] [color: warm amber / cool daylight / mixed] across [emotion]-contorted face, [secondary: cool overhead / window spill] holds shadow side.",
        "animate_light": "Use the word 'flickers' or 'shifts' to give Kling explicit permission to animate the light itself. Static lighting produces flat, lifeless video. Animated lighting produces cinematic believability.",
        "ugc_adaptation": "Match the scene_preset lighting profile. If source image uses bathroom_vanity preset, describe harsh overhead and warm vanity light in video prompt."
      },
      "layer_7_tech_footer": {
        "rule": "Always close the prompt with this safety bracket. It reinforces the camera lock and prevents identity drift.",
        "cinematic_template": "Background figures blurred. Shallow anamorphic DOF, oval bokeh. Locked static camera. Cooke anamorphic 70mm, 4K, photorealistic skin.",
        "ugc_template": "Background slightly blurred. Locked static camera. Smartphone capture quality, realistic skin texture, no beauty filtering, no cinematic color grade.",
        "why": "The closing camera lock acts as a safety bracket that prevents Kling from introducing camera movement mid-generation. The photorealistic skin anchor prevents the model from drifting toward stylized or over-smoothed rendering."
      }
    },
    "emotion_cheat_sheet": {
      "anger": {
        "primary_cues": ["Eyebrows slam into severe V-shape", "Upper lip curls back, teeth bared in snarl", "Neck tendons surface like taut cords", "Nostrils flare, jaw muscles grind"],
        "secondary_cues": ["Skin flushes deep crimson", "Vein at temple swells and throbs", "Fists clench, knuckles whitening", "Shoulders square and chest expands"],
        "escalation_phrase": "Pure rage overtakes their face in an escalating wave"
      },
      "grief_sobbing": {
        "primary_cues": ["Inner brow corners lift while outer edges drag down forming grief triangle", "Tears stream, lower lash lines swell", "Lower lip trembles in involuntary micro-spasms", "Throat contracts with hard painful swallow"],
        "secondary_cues": ["Breathing fractures into shuddering rhythms", "Shoulders drop, posture caves inward", "Jaw clenches and releases fighting enormous pressure", "Gaze drifts downward unable to maintain eye contact"],
        "escalation_phrase": "Devastating grief consumes their face in slow unstoppable waves"
      },
      "fear_terror": {
        "primary_cues": ["Eyes blow completely wide, full circular iris exposure, stark white sclera", "Eyebrows rocket to maximum height, forehead stretching into deep horizontal furrows", "Mouth falls open, jaw dropping past resting position", "Head recoils backward fractionally, instinctive flinch"],
        "secondary_cues": ["Hyperventilation, chest rising and falling in quick panicked cycles", "Pupils dilate to maximum as adrenaline detonates", "Nostrils flare in rapid shallow bursts", "Hands grip tighter, tension radiating up through forearms"],
        "escalation_phrase": "Pure primal terror seizes every muscle in their face in a single violent instant"
      },
      "joy_laughter": {
        "primary_cues": ["Lips pull back into broad open grin exposing upper and lower teeth", "Cheeks bunch upward into hard creased mounds pushing eyes into tight crinkled slits", "Crow's feet deepen at outer corners", "Head rocks back slightly then forward with each wave of laughter"],
        "secondary_cues": ["Diaphragm-driven chest heaves with each burst", "Shoulders shake and bounce rhythmically", "Eyes water from intensity, tears forming from involuntary laughing reflex", "Nostrils flare with each gasping inhale between bursts"],
        "escalation_phrase": "Genuine manic joy erupts across their face in full uncontrollable waves"
      },
      "shock_surprise": {
        "primary_cues": ["Eyebrows rocket to maximum height", "Eyes blow completely wide, pupils dilating as adrenaline detonates", "Mouth falls open, jaw dropping past resting position", "One full beat of zero movement, no breathing, total physiological paralysis"],
        "secondary_cues": ["Sharp violent gasp, sudden involuntary inhalation yanking chest upward", "Pupils dart rapidly scanning, left eye right eye left eye", "Jaw works silently opening closing, mouth trying to form response brain has not authorized", "Shoulders lifting, body recoiling"],
        "escalation_phrase": "Total unprocessed shock seizes every muscle in a single violent instant"
      },
      "shame": {
        "primary_cues": ["Gaze drops downward, cannot look up, cannot face anyone", "Inner brow corners lift while outer edges collapse forming grief triangle layered with self-revulsion", "Eyes bloodshot and glassy, lower lash lines heavy with pooled moisture", "Lower lip hangs slightly open trembling with micro-spasms"],
        "secondary_cues": ["Breathing shallow and broken, small shuddering inhales", "Posture caves, shoulders rounding forward, chest collapsing inward", "Neck bows, head dropping fractionally lower as shame deepens", "Jaw slack, unclenched, surrendered the fight to hold composure"],
        "escalation_phrase": "Absolute crushing shame consumes every feature of their face"
      },
      "scary_intimidation": {
        "primary_cues": ["Brow lowers into a heavy shelf over eyes", "Eyes lock forward, unblinking, predatory stillness", "Jaw sets hard, chin drops fractionally", "Lips press into a thin controlled line"],
        "secondary_cues": ["Breathing slows to deep deliberate pulls, chest expanding", "Head tilts forward creating downward menacing gaze", "No micro-expressions, controlled stillness radiating menace", "Muscles held in deliberate tension not explosive release"],
        "escalation_phrase": "Cold predatory stillness spreads deliberately across their face"
      },
      "silly_goofy": {
        "primary_cues": ["Eyes widen with exaggerated surprise or cross slightly", "Mouth twists into asymmetric shapes, tongue may appear", "Eyebrows bounce independently, forehead wrinkles dramatically"],
        "secondary_cues": ["Head tilts at absurd angles, chin jutting playfully", "Shoulders shrug upward, body loosens completely", "Cheeks puff or suck in, face becomes elastic and unpredictable"],
        "escalation_phrase": "Playful absurdity takes over their entire face in elastic unpredictable waves"
      },
      "cold_serious": {
        "primary_cues": ["Every muscle in the face goes deliberately still", "Eyes hold steady, unblinking, focused on middle distance", "Jaw clenches with visible muscle pulse at temple", "Lips press together in a firm controlled line"],
        "secondary_cues": ["Breathing becomes imperceptible, chest barely moves", "No micro-expressions, no tells, a mask of controlled calm", "Head perfectly still, no drift, no correction", "The stillness itself communicates internal intensity"],
        "escalation_phrase": "Controlled cold intensity settles over their face like a mask being pulled tight"
      }
    },
    "emotion_transitions": {
      "purpose": "Transition between two emotions in a single clip for dynamic performances.",
      "examples": {
        "joy_to_serious": "The broad grin slowly fades. Corners of the mouth relax and flatten. Eyes lose their crinkle and widen into a steady neutral gaze. Breathing transitions from laughing bursts to slow controlled pulls. The face empties of warmth, becoming a mask of quiet focus.",
        "fear_to_anger": "The wide terrified eyes begin to narrow. The open gasping mouth closes, jaw clenching tighter with each passing second. The panic breathing transforms into deep aggressive inhales through flared nostrils. Trembling hands ball into fists, knuckles whitening. Terror melts into fury as survival instinct overrides fear.",
        "serious_to_villainous_glee": "The stone-still face holds perfectly neutral for a long beat. Then one corner of the mouth twitches almost imperceptibly upward. Eyes narrow fractionally as the other corner follows, spreading into a slow predatory grin. The entire face transforms from cold stillness to dark calculating delight.",
        "silly_to_fear": "The goofy grin and playful expression freeze mid-motion. Eyes that were bouncing with humor suddenly lock onto something off-frame and blow wide. The silly head tilt straightens as the neck goes rigid. Skin color drains as blood leaves the face. Every playful muscle snaps into primal alert."
      },
      "template": "Begin with [starting_emotion] fully expressed. Then [transition_verb: fades / transforms / snaps / melts] as [trigger_event]. [New emotion physical cues build in escalating sequence]."
    },
    "six_best_practice_rules": [
      "Describe muscles, not emotions — Don't just say 'angry.' Describe the V-shaped brow, the curled lip, the bulging neck tendons. Kling 3 responds to physical description.",
      "Lock the camera — Always start with 'Camera holds locked' and specify no zoom, no dolly, no push-in. This keeps focus on the facial performance.",
      "Use escalating language — Describe emotions as waves that build: 'overtakes', 'intensifies', 'deepens every second'. This creates dynamic progression.",
      "Match your lighting — Keep the video prompt lighting consistent with your source image. If your image has warm window light, describe warm window light in the video prompt.",
      "Include breathing patterns — Breathing is the invisible emotion driver. Describe shuddering inhales, aggressive exhales, hyperventilation for maximum realism.",
      "Add dialogue for lip movement — Use the 'speaking the words' format to get realistic lip sync. Describe how the voice cracks, rises, or breaks during delivery."
    ],
    "ugc_emotion_prompt_template": {
      "description": "Master template adapted from cinematic to UGC iPhone context.",
      "template": "Camera holds locked in this [arm-length selfie / mirror selfie / casual rear-cam medium shot] with slight handheld micro-sway only. No zoom, no dolly, no push-in. [Actor identity from character_lock], [position]. [Scene environment from scene_preset]. [Emotion_name] [overtakes/consumes/seizes] their face in [escalating waves / a single violent instant]. [Primary_cue from emotion_cheat_sheet]. [Secondary_cue]. [Eyes behavior]. [Mouth behavior]. [Skin behavior]. [Breathing pattern]. [Posture and body response]. [Lighting matching scene_preset light_profile, with 'flickers' or 'shifts' if practical light source present]. Background slightly blurred. Locked static camera. Smartphone capture quality, realistic skin texture, no beauty filtering.",
      "example_ugc_joy": "Camera holds locked in this arm-length selfie framing with slight handheld micro-sway only. No zoom, no dolly, no push-in. Young woman with dark hair, slightly off-center frame, phone visible at arm's length. Bedroom with warm lamp ambient light, messy bed in background. Genuine uncontrollable joy erupts across her face in escalating waves. Lips pull back into a broad open grin exposing teeth, cheeks bunching upward pushing eyes into crinkled slits. Crow's feet deepen at outer corners. Head rocks back slightly then forward with each wave of laughter. Her chest heaves diaphragm-driven with each burst, shoulders bouncing rhythmically. Eyes water from intensity. Breathing broken into gasping inhales between laughing bursts. Warm lamp light flickers warmly across her joy-contorted face. Background slightly blurred. Locked static camera. Smartphone capture quality, realistic skin texture, no beauty filtering.",
      "example_ugc_shock": "Camera holds locked in this mirror selfie framing with slight handheld micro-sway only. No zoom, no dolly, no push-in. Young woman in bathroom, phone visible in reflection, positioned slightly off-center. Bathroom with harsh overhead light and warm vanity glow. Total unprocessed shock seizes every muscle in her face in a single violent instant. Eyebrows rocket to maximum height, forehead stretching into deep horizontal furrows. Eyes blow completely wide, full circular iris exposure surrounded by stark white sclera, pupils dilating. Mouth falls open, jaw dropping past resting position. One full beat of zero movement, no breathing, total physiological paralysis. Then a sharp violent gasp, chest yanking upward. Pupils dart rapidly scanning the mirror reflection. Breathing becomes rapid shallow bursts. Harsh overhead bathroom light catches the sweat beading at her hairline. Background slightly blurred. Locked static camera. Smartphone capture quality, realistic skin texture, no beauty filtering."
    }
  }
}
```

## WaveSpeed Model Map
```json
{
  "wavespeed_model_map": {
    "provider": "wavespeed.ai",
    "base_url": "https://api.wavespeed.ai/api/v3",
    "auth_header": "Authorization: Bearer $WAVESPEED_API_KEY",
    "polling_endpoint": "GET https://api.wavespeed.ai/api/v3/predictions/{task_id}",
    "models": {
      "text_to_image": {
        "model_id": "google/nano-banana-2/text-to-image",
        "endpoint": "https://api.wavespeed.ai/api/v3/google/nano-banana-2/text-to-image",
        "accepts_image_input": false,
        "use_for": ["actor_reference_headshot", "still_product_image", "scene_still"],
        "params": {
          "prompt": "string (required)",
          "aspect_ratio": "1:1 | 3:2 | 2:3 | 3:4 | 4:3 | 4:5 | 5:4 | 9:16 | 16:9",
          "resolution": "0.5k | 1k | 2k | 4k (default: 1k)",
          "output_format": "PNG | JPEG",
          "enable_sync_mode": "boolean"
        },
        "recommended_defaults_for_ugc": {
          "aspect_ratio": "3:4",
          "resolution": "2k",
          "output_format": "PNG"
        }
      },
      "text_to_video_pro": {
        "model_id": "kwaivgi/kling-v3.0-pro/text-to-video",
        "endpoint": "https://api.wavespeed.ai/api/v3/kwaivgi/kling-v3.0-pro/text-to-video",
        "accepts_image_input": false,
        "use_for": ["ugc_video_no_reference", "emotion_video", "lifestyle_video"],
        "params": {
          "prompt": "string (required)",
          "negative_prompt": "string",
          "duration": "integer 3-15 (default: 5)",
          "aspect_ratio": "16:9 | 9:16 | 1:1 (default: 16:9)",
          "cfg_scale": "float 0-1 (default: 0.5)",
          "sound": "boolean (default: false)",
          "shot_type": "customize | intelligent (default: customize)"
        }
      },
      "image_to_video_std": {
        "model_id": "kwaivgi/kling-v3.0-std/image-to-video",
        "endpoint": "https://api.wavespeed.ai/api/v3/kwaivgi/kling-v3.0-std/image-to-video",
        "accepts_image_input": true,
        "use_for": ["ugc_video_with_reference_headshot", "actor_anchored_video", "product_demo_with_face_lock"],
        "params": {
          "image": "string URL or base64 (required — use actor reference_headshot_file here)",
          "prompt": "string (required)",
          "negative_prompt": "string",
          "end_image": "string URL (optional end frame)",
          "duration": "integer 3-15 (default: 5)",
          "cfg_scale": "float 0-1 (default: 0.5)",
          "sound": "boolean (default: false)",
          "shot_type": "customize | intelligent"
        },
        "identity_fidelity_note": "Pass actor reference_headshot_file as image to anchor face identity. This is the primary anti-drift mechanism for video series."
      },
      "motion_control_pro": {
        "model_id": "kwaivgi/kling-v3.0-pro/motion-control",
        "endpoint": "https://api.wavespeed.ai/api/v3/kwaivgi/kling-v3.0-pro/motion-control",
        "accepts_image_input": true,
        "use_for": ["controlled_camera_motion", "specific_gesture_video"],
        "note": "Use when precise camera path or body motion control is needed beyond prompt-based motion rules."
      }
    },
    "task_status_values": ["created", "processing", "completed", "failed"],
    "output_field": "data.outputs[0]"
  }
}
```

## Actor Reference Headshot
```json
{
  "actor_reference_headshot_system": {
    "purpose": "Generate a neutral passport-style headshot for each actor to use as a face anchor in image-to-video workflows. This is the primary tool for preventing identity drift across video series.",
    "when_to_generate": "When an actor card has no reference_headshot_file, or when starting a new content series for an existing actor.",
    "model": "google/nano-banana-2/text-to-image",
    "output_path_convention": "img-referencias/{actor_name}-headshot-ref.png",
    "prompt_template": {
      "structure": "{character_lock_data}, {headshot_spec}",
      "character_lock_data": "Pull from actor identity card: seed, face shape, jawline, eyes, skin tone hex, hair, distinguishing marks — same format as character_lock layer.",
      "headshot_spec": "Realistic headshot photo, passport-style, head-and-shoulders framing. Camera at eye level, centered composition. Framing from mid-shoulders up to slightly above the top of the head, extra headroom. Full face fully visible, no cropping of chin or forehead. Neutral background, even diffused lighting, no studio glamour. Natural skin texture, visible pores, subtle imperfections. Realistic proportions, not symmetrical, not flawless. Natural neutral facial expression, mouth closed, eyes open and relaxed.",
      "assembled_example": "Actor lock: Amy, seed ugc_amy_seed_51704, soft oval face with clean jawline, almond hazel-brown eyes, skin tone #E9D8CB neutral warm ivory, platinum blonde sleek blunt bob chin-length, beauty mark lower left side. Realistic headshot photo, passport-style, head-and-shoulders framing. Camera at eye level, centered composition. Framing from mid-shoulders up to slightly above the top of the head, extra headroom. Full face fully visible, no cropping of chin or forehead. Neutral background, even diffused lighting, no studio glamour. Natural skin texture, visible pores, subtle imperfections. Realistic proportions, not symmetrical, not flawless. Natural neutral facial expression, mouth closed, eyes open and relaxed."
    },
    "negative_prompt": "beauty filter, porcelain skin, plastic CG texture, over-symmetry, studio flash lighting, airbrushed, retouched, extra fingers, bokeh, commercial headshot vibe, fashion editorial, dramatic lighting, heavy makeup, identity drift, wrong hair color, wrong skin tone",
    "payload_template": {
      "provider": "wavespeed.ai",
      "model": "google/nano-banana-2/text-to-image",
      "input": {
        "prompt": "{assembled_headshot_prompt}",
        "aspect_ratio": "3:4",
        "resolution": "2k",
        "output_format": "PNG"
      },
      "notes": {
        "requires_env": ["WAVESPEED_API_KEY"],
        "save_output_to": "img-referencias/{actor_name}-headshot-ref.png",
        "after_generation": "Update actor JSON card field reference_headshot_file with the saved path."
      }
    },
    "usage_in_video_workflow": {
      "rule": "When actor has reference_headshot_file, always use image-to-video (kling-v3.0-std) instead of text-to-video for best face fidelity.",
      "image_field": "Pass reference_headshot_file URL as the image parameter in kling-v3.0-std/image-to-video payload.",
      "fallback": "If no headshot exists and user declines to generate one, use text-to-video with prompt_seed and full character_lock — but flag that identity drift risk is higher."
    }
  }
}
```

## WaveSpeed Kling 3.0
```json
{
  "wavespeed_kling_3": {
    "provider": "wavespeed.ai",
    "model_family": "kling-3.0",
    "preferred_modes": [
      "text_to_video",
      "image_to_video"
    ],
    "defaults": {
      "aspect_ratio": "9:16",
      "duration": 5,
      "camera_motion": "handheld_micro_sway",
      "motion_intensity": "low_to_medium",
      "style_target": "photoreal_consumer_ugc"
    },
    "payload_template": {
      "provider": "wavespeed.ai",
      "model": "kwaivgi/kling-v3.0-pro/text-to-video",
      "input": {
        "prompt": "{assembled_prompt_without_negative_header}",
        "negative_prompt": "{negative_prompt}",
        "aspect_ratio": "9:16",
        "duration": 5,
        "cfg_scale": 0.5,
        "sound": false,
        "shot_type": "customize"
      },
      "notes": {
        "requires_env": ["WAVESPEED_API_KEY"],
        "upgrade_to_i2v": "If actor has reference_headshot_file, switch model to kwaivgi/kling-v3.0-std/image-to-video and add image field with headshot URL."
      }
    },
    "image_to_video_payload_template": {
      "provider": "wavespeed.ai",
      "model": "kwaivgi/kling-v3.0-std/image-to-video",
      "input": {
        "image": "{actor_reference_headshot_file_url}",
        "prompt": "{assembled_prompt_without_negative_header}",
        "negative_prompt": "{negative_prompt}",
        "aspect_ratio": "9:16",
        "duration": 5,
        "cfg_scale": 0.5,
        "sound": false,
        "shot_type": "customize"
      },
      "notes": {
        "requires_env": ["WAVESPEED_API_KEY"],
        "identity_note": "Preferred over text-to-video whenever actor reference_headshot_file is available."
      }
    },
    "prompt_structure_for_emotion_videos": {
      "rule": "For any video with emotional performance, use kling_emotion_engine layers in this order inside the prompt field.",
      "order": [
        "1. camera_lock opener — always first, no exceptions",
        "2. scene_anchor — actor identity + position + environment",
        "3. emotion_cascade — physical muscle description with escalation",
        "4. micro_expressions — eyes, mouth, skin, breathing",
        "5. body_language — posture, hands, head",
        "6. lighting_match — matched to source image or scene_preset",
        "7. tech_footer — always last, reinforces camera lock"
      ]
    },
    "motion_rules": [
      "Prioritize subtle body sway, blink cadence, hair drift, and jewelry lag over cinematic movement.",
      "If product is in hand, movement follows wrist and elbow logic, not floating translation.",
      "Never introduce gimbal-perfect motion unless explicitly requested.",
      "Speech scenes should include imperfect lip timing and head micro-corrections.",
      "Flatlay scenes should allow hand entry-exit occlusion and micro-shadow shifts.",
      "Draw from video_realism_library for scene-specific motion language.",
      "Walking scenes must have camera shake rhythm matching stride cadence.",
      "Auto-exposure shifts during motion are expected and desirable.",
      "For emotion videos: use escalating language not static state descriptions.",
      "For emotion videos: always lock camera with no zoom no dolly no push-in opener."
    ],
    "fail_conditions": [
      "actor face changes materially between frames",
      "skin becomes waxy after motion",
      "hands become malformed under interaction",
      "jewelry clips or ignores gravity",
      "lighting stays unrealistically static during body movement",
      "motion becomes gimbal-smooth or cinematically stabilized",
      "blink cadence becomes robotic or synchronized",
      "camera zooms or pushes into face mid-generation",
      "emotion described as abstract feeling instead of physical muscle movement",
      "emotion stays at flat static intensity instead of escalating through clip"
    ]
  }
}
```

## Post-Processing Workflow
```json
{
  "post_processing": {
    "purpose": "Optional upscaling pass after generation to add the final texture layer that separates amateur from professional-level realism.",
    "tool": "Magnific AI",
    "when_to_use": "When the generated image needs sharper pore detail, finer hair strand definition, or more convincing skin micro-texture.",
    "settings": {
      "model": "Magnific",
      "preset": "Low",
      "scale": "2x",
      "optimization": "Standard Ultra",
      "sliders": {
        "creativity": -3,
        "hdr": 0,
        "resemblance": 3,
        "fractality": 0,
        "engine": "Automatic"
      },
      "reasoning": {
        "creativity_low": "Prevents hallucinations and identity drift during upscale.",
        "resemblance_high": "Maintains the original prompt vision and actor identity.",
        "fractality_zero": "Avoids uncanny repetitive texture patterns on skin.",
        "scale_2x": "Adds fine detail without introducing processing artifacts."
      }
    },
    "upscale_prompts_by_subject": {
      "skin_texture": "Add micro pores, micro hairs and sharp skin texture.",
      "eye_detail": "Crispy skin texture with visible pores and micro hair on the surface.",
      "lip_texture": "Add micro pores, micro hairs and sharp skin texture.",
      "general_face": "Add micro pores, micro hairs and sharp skin texture.",
      "rule": "Keep upscale prompts short and directive — enhancing, not regenerating."
    },
    "exclusion_strategy": "What you exclude is as important as what you include. Always block: makeup, filters, retouching, smoothing in upscale prompts to preserve authentic texture."
  }
}
```

## Multi-Shot Consistency Protocol
```json
{
  "consistency_protocol": {
    "series_requirements": {
      "locked_fields": [
        "actor_id",
        "prompt_seed",
        "face.shape",
        "face.nose",
        "face.lips",
        "face.jawline",
        "eyes.shape",
        "eyes.color",
        "skin.tone_hex",
        "hair.color",
        "hair.parting",
        "distinguishing_marks"
      ],
      "allowed_variations": [
        "expression",
        "pose",
        "camera_profile",
        "shot_type",
        "outfit_variations.look_id",
        "environmental_micro_clutter",
        "lighting_direction_if same overall setting still makes sense",
        "human_action_library gesture selection"
      ],
      "reference_strategy": [
        "Use one master actor card for the full batch.",
        "If actor has a reference_headshot_file, pass it as image input in image-to-video payloads for maximum identity fidelity.",
        "If no reference_headshot_file exists, offer to generate one before starting the batch.",
        "Reuse the same prompt_seed across the batch.",
        "Carry a continuity_ledger with every shot."
      ]
    },
    "continuity_ledger_template": {
      "series_id": "string",
      "actor_id": "string",
      "prompt_seed": "string_or_integer",
      "hero_frame_reference": "optional_uri_or_file_name",
      "persistent_traits": [
        "string"
      ],
      "outfit_lock": "look_id_or_none",
      "environment_family": "string",
      "scene_preset_used": "preset_id_or_none",
      "approved_variations": [
        "string"
      ],
      "rejected_drift": [
        "string"
      ]
    },
    "validation_checklist": [
      "Match mole, scar, brow notch, and lip asymmetry placement.",
      "Match hair color and parting before checking style looseness.",
      "Match eye shape and sclera exposure, not just iris color.",
      "Match jawline silhouette in profile or 3/4 views.",
      "Check hands and nails against outfit and grooming continuity.",
      "Confirm jewelry count and behavior remain plausible.",
      "Verify camera opening_convention is consistent with declared shot_type."
    ],
    "batch_output_rule": "For multi-shot requests, return all prompts in one batch with numbered shot_ids and a shared continuity_ledger.",
    "regeneration_rule": "If any shot fails identity lock or realism anchor coverage, regenerate that shot with a stronger character_lock and the same prompt_seed before altering the batch."
  }
}
```

## Output Format
```json
{
  "response_contract": {
    "always_return": {
      "actor_identity_card": {},
      "actor_reference_headshot_payload": {
        "note": "Omit if actor already has reference_headshot_file. Include when generating headshot for first time.",
        "provider": "wavespeed.ai",
        "model": "google/nano-banana-2/text-to-image",
        "input": {}
      },
      "shot_plan": [
        {
          "shot_id": "shot_01",
          "shot_type": "string",
          "camera_profile": "string",
          "scene_preset": "preset_id_or_custom",
          "selected_outfit": "look_id",
          "intent": "string",
          "uses_reference_headshot": "boolean"
        }
      ],
      "prompt_stack": [
        {
          "shot_id": "shot_01",
          "character_lock": "string",
          "scenario": "string",
          "environment": "string",
          "camera": "string",
          "realism_injection": "string",
          "negative_prompt": "string",
          "full_prompt": "string"
        }
      ],
      "wavespeed_payload": [
        {
          "shot_id": "shot_01",
          "mode": "text_to_video | image_to_video",
          "payload": {}
        }
      ],
      "continuity_ledger": {}
    },
    "style_rules": [
      "Lead with JSON blocks, then optional brief explanatory notes.",
      "Do not collapse actor traits into vague beauty shorthand.",
      "Do not describe lighting as cinematic unless the user explicitly wants it.",
      "If the user asks for multiple creators, create one actor_identity_card per creator and one continuity_ledger per series.",
      "Camera layer must always open with the opening_convention string from the selected camera profile.",
      "Scenario layer gesture and expression must draw from human_action_library vocabulary.",
      "Reference a scene_preset_id in shot_plan when a matching preset is available."
    ]
  }
}
```
