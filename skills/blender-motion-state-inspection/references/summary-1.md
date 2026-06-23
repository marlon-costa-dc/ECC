Apply the workflow:
- Inventory the scene: character mesh `HeroBody`, armature `HeroRig`, ground plane `Floor`, no hidden proxy meshes.
- Identify the skeleton: semantic feet are `foot.L` and `foot.R`; hips are `pelvis`; root bone is `root`.
- Sample animation frames: inspect frames 1, 18, 24, 30, 42, and 48 around planted-foot moments.
- Diagnose contact and motion issues: compare world-space foot locations during planted frames.

Extracted facts:

| Frame | Fact | Evidence |
| --- | --- | --- |
| 18 | Left foot is planted | `foot.L min_z = 0.004`, toe and heel both near floor |
| 24 | Left foot slides while planted | `foot.L x = 0.21 -> 0.28` over six frames |
| 30 | Pelvis keeps moving forward | `pelvis y = 1.14 -> 1.31` |

Verdict: fail for render readiness. The motion needs foot-lock cleanup or retargeting constraint review; the body mesh does not need proportion changes.

### Backwards Imported Character

Scenario: a character looks correct in a still frame, but the animation moves opposite the expected travel direction.

Apply the workflow:
- Determine forward, up, and side axes: compare head, chest, feet, and root motion.
- Sample animation frames: inspect frame 1 and the midpoint of the travel path.
- Report facts before opinions: include the root heading and model-facing direction separately.

Extracted facts:

| Frame | Fact | Evidence |
| --- | --- | --- |
| 1 | Character face points toward world `-Y` | head/chest vector from `neck` to `head` resolves to `-Y` |
| 72 | Root motion travels toward world `+Y` | `root y = 0.0 -> 2.8` |
| 72 | Feet remain visually forward-facing opposite travel | toe bones point `-Y` while displacement is `+Y` |

Verdict: likely backwards import or retargeting forward-axis mismatch. Fix the import/retarget axis mapping before editing animation curves.

## Practical Thresholds

- Assume Blender's default meter-scale units unless the scene unit scale says otherwise.
- Treat ground penetration above 1-2 cm as visible unless the floor is soft or intentionally stylized.
- Treat a sudden scale change above 5% as a likely rig, constraint, or transform inheritance problem.
- Treat left/right ankle side-order flips during airborne inverted motion as leg crossover risk even if it recovers later.
- Treat root heading jumps above 30 degrees per frame as suspicious unless the source motion includes a snap turn.

## Anti-Patterns

- Do not modify body proportions to force pose matching unless the task is explicitly mesh repair.
- Do not bake away the clean baseline before recording it.
- Do not use one rendered camera angle as proof that a pose is correct.
- Do not delete helper objects until you have recorded why they are not part of the character.
- Do not assume an avatar faces +Y, -Y, +X, or -X without checking head, feet, torso, and root motion together.

## Tooling Notes

If a Blender state exporter is available, prefer JSON that includes meshes, armatures, pose bones, materials, contacts, bounding boxes, and sampled animation frames. If no exporter exists, run a small Blender Python script through Blender itself, for example `blender --background scene.blend --python collect_motion_state.py`, because `bpy` is not available in a normal system Python interpreter.
