# Blender Motion State Inspection

## When to Use

- A Blender character looks twisted, mirrored, flattened, offset, or foot-sliding in an animation.
- A user asks whether an imported avatar, armature, or retargeted motion matches an expected pose.
- You need to compare rendered evidence with structured facts such as bones, bounding boxes, contacts, and facing vectors.
- A workflow depends on deciding whether a model is a character, prop, proxy mesh, control rig, or broken import.

## Core Principle

Do not judge animated 3D assets only from screenshots. Screenshots are review evidence, but they hide axis conventions, bone names, object scale, local transforms, parented meshes, material slots, and frame-by-frame contact state.

First extract structured Blender state, then use viewport screenshots or renders to confirm what the facts imply.

## How It Works

1. Establish the clean scene and asset baseline before judging motion.
2. Extract structured facts from Blender using an exporter or Blender Python run inside Blender's own interpreter.
3. Sample the frames most likely to expose contact, orientation, scale, and retargeting errors.
4. Compare the measured facts against the user's expected pose, direction, ground plane, and render goal.
5. Return a concise report that separates confirmed facts, likely causes, and required fixes.

## Inspection Workflow

1. Inventory the scene.
   - List meshes, armatures, empties, cameras, lights, modifiers, parent relationships, and hidden objects.
   - Separate character meshes from helper/proxy geometry before judging the avatar.
   - Record object-space and world-space bounding boxes.

2. Identify the skeleton.
   - Capture armature names, pose bones, bone heads/tails, roll, parent chains, constraints, and rest-pose axes.
   - Map semantic bones such as hips, spine, neck, head, shoulders, elbows, hands, thighs, knees, ankles, and feet.
   - Flag missing left/right pairs and unusual naming schemes.

3. Determine forward, up, and side axes.
   - Use the pelvis, spine, shoulders, hips, head, and feet together; do not rely on a single mesh normal.
   - Compare local armature axes with world axes and imported file conventions such as glTF Y-up vs Blender Z-up.
   - Mark likely mirrored or backwards imports when face/head/feet direction conflicts with root motion.

4. Sample animation frames.
   - Inspect first, middle, contact, airborne, and extreme frames.
   - Record root location, root heading, pelvis height, torso lean, limb directions, foot clearance, and mesh bounds.
   - For long or fast motion, sample more densely around flips, landings, turns, collisions, and floor contacts.

5. Check model integrity before retargeting blame.
   - Confirm the clean baseline shape before applying animation.
   - Preserve original mesh, materials, armature, and skinning unless the user explicitly asks for repair.
   - Treat unexplained sphere-like blobs, giant proxy meshes, or crushed bodies as import/selection issues until proven otherwise.

6. Diagnose contact and motion issues.
   - Ground penetration: compare lowest foot or shoe vertices with floor height per frame.
   - Foot sliding: compare foot world positions across planted frames.
   - Leg crossover: compare left/right thigh, knee, ankle, and foot side ordering.
   - Twist damage: compare bone swing direction separately from roll/twist around the limb axis.
   - Scale drift: compare animated mesh bounds against the clean baseline bounds.

7. Report facts before opinions.
   - Include frame numbers, object names, bone names, world coordinates, and thresholds.
   - Separate confirmed failures from visual suspicions.
   - Attach screenshots only after the structured state explains what to look for.

## Recommended Report Shape

[See code example 1 in `code-examples.md`]

## Examples

### Walk Cycle With Foot Sliding

Scenario: a retargeted character appears to skate during a walk cycle, but the front camera angle makes the foot contact hard to judge.

---

For additional details, continue reading `summary-1.md`.
