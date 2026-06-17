---
name: blender-motion-state-inspection
description: Use when inspecting Blender characters, rigs, poses, animation retargeting,
  ground contact, facing direction, or model-vs-motion alignment where screenshots alone
  are not enough.
origin: ECC
tools: Read, Write, Edit, Bash, Grep, Glob
---

# Blender Motion State Inspection

- A Blender character looks twisted, mirrored, flattened, offset, or foot-sliding in an animation. - A user asks whether an imported avatar, armature, or retargeted motion matches an expected pose. - You need to compare rendered...

## When to Use

- A Blender character looks twisted, mirrored, flattened, offset, or foot-sliding in an animation.
- A user asks whether an imported avatar, armature, or retargeted motion matches an expected pose.
- You need to compare rendered evidence with structured facts such as bones, bounding boxes, contacts, and facing vectors.
- A workflow depends on deciding whether a model is a character, prop, proxy mesh, control rig, or broken import.

## Workflow

1. Establish the clean scene and asset baseline before judging motion.
2. Extract structured facts from Blender using an exporter or Blender Python run inside Blender's own interpreter.
3. Sample the frames most likely to expose contact, orientation, scale, and retargeting errors.
4. Compare the measured facts against the user's expected pose, direction, ground plane, and render goal.
5. Return a concise report that separates confirmed facts, likely causes, and required fixes.
6. Inventory the scene.

For full details, examples, edge cases, and reference material, read `references/summary.md`.
