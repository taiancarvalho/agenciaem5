# design-md-extractor

A framework for extracting structured design systems from unstructured inputs into the `@google/design.md` format.

## Purpose
Convert briefings, screenshots, brand guidelines, and UI references into valid `DESIGN.md` files that can be consumed by AI agents and design tools.

## Quick Start
```bash
# Install dependencies
npm install

# Validate a generated DESIGN.md
npx @google/design.md lint DESIGN.md

# Export tokens to other formats
npx @google/design.md export --help
```

## Structure
- `designs/`: Organized design extractions by project slug.
  - `[project-slug]/`:
    - `DESIGN.md`: The core design system file.
    - `preview.html`: Visual representation of the system.
    - `tokens.json`: Exported tokens.
    - `theme.css`: Exported Tailwind/CSS config.
    - `source/`: Original inputs (briefings, screenshots).
- `docs/`: Strategic planning and specification notes.
- `prompts/`: Optimized LLM prompts for extraction and validation.
- `examples/`: Reference inputs for testing.
- `templates/`: Base files for generating previews.
