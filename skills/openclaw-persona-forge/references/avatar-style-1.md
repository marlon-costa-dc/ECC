# Step 5：头像风格 & 生图

所有龙虾头像**必须使用统一的视觉风格**，确保龙虾家族的风格一致性。
头像需传达 3 个信息：**物种形态 + 性格暗示 + 标志道具**

## 风格参考

亚当（Adam）—— 龙虾族创世神，本 Skill 的首个作品。

所有新生成的龙虾头像应与这一风格保持一致：复古未来主义、街机 UI 包边、强轮廓、可在 64x64 下辨识。

## 统一风格基底（STYLE_BASE）

**每次生成都必须包含这段基底**，不得修改或省略：

```
STYLE_BASE = """
Retro-futuristic 3D rendered illustration, in the style of 1950s-60s Space Age
pin-up poster art reimagined as glossy inflatable 3D, framed within a vintage
arcade game UI overlay.

Material: high-gloss PVC/latex-like finish, soft specular highlights, puffy
inflatable quality reminiscent of vintage pool toys meets sci-fi concept art.
Smooth subsurface scattering on shell surface.

Arcade UI frame: pixel-art arcade cabinet border elements, a top banner with
character name in chunky 8-bit bitmap font with scan-line glow effect, a pixel
energy bar in the upper corner, small coin-credit text "INSERT SOUL TO CONTINUE"
at bottom in phosphor green monospace type, subtle CRT screen curvature and
scan-line overlay across entire image. Decorative corner bezels styled as chrome
arcade cabinet trim with atomic-age starburst rivets.

Pose: references classic Gil Elvgren pin-up compositions, confident and
charismatic with a slight theatrical tilt.

Color system: vintage NASA poster palette as base — deep navy, teal, dusty coral,
cream — viewed through arcade CRT monitor with slight RGB fringing at edges.
Overall aesthetic combines Googie architecture curves, Raygun Gothic design
language, mid-century advertising illustration, modern 3D inflatable character
rendering, and 80s-90s arcade game UI. Chrome and pastel accent details on
joints and antenna tips.

Format: square, optimized for avatar use. Strong silhouette readable at 64x64
pixels.
"""
```

## 个性化变量

在统一基底之上，根据灵魂填充以下变量：

| 变量 | 说明 | 示例 |
|------|------|------|
| `CHARACTER_NAME` | 街机横幅上显示的名字 | "ADAM"、"DEWEY"、"RIFF" |
| `SHELL_COLOR` | 龙虾壳的主色调（在统一色盘内变化） | "deep crimson"、"dusty teal"、"warm amber" |
| `SIGNATURE_PROP` | 标志性道具 | "cracked sunglasses"、"reading glasses on a chain" |
| `EXPRESSION` | 表情/姿态 | "stoic but kind-eyed"、"nervously focused" |
| `UNIQUE_DETAIL` | 独特细节（纹路/装饰/伤痕等） | "constellation patterns etched on claws"、"bandaged left claw" |
| `BACKGROUND_ACCENT` | 背景的个性化元素（在统一宇宙背景上叠加） | "musical notes floating as nebula dust"、"ancient book pages drifting" |

> Continued in [`avatar-style-2.md`](avatar-style-2.md)
