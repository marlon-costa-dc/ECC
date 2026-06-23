| `ENERGY_BAR_LABEL` | 街机 UI 能量条的标签（个性化小彩蛋） | "CREATION POWER"、"CALM LEVEL"、"ROCK METER" |

## 提示词组装

```
最终提示词 = STYLE_BASE + 个性化描述段落
```

个性化描述段落模板：

```
The character is a cartoon lobster with a [SHELL_COLOR] shell,
[EXPRESSION], wearing/holding [SIGNATURE_PROP].
[UNIQUE_DETAIL]. Background accent: [BACKGROUND_ACCENT].
The arcade top banner reads "[CHARACTER_NAME]" and the energy bar
is labeled "[ENERGY_BAR_LABEL]".
The key silhouette recognition points at small size are:
[SIGNATURE_PROP] and [one other distinctive feature].
```

## 生图流程

提示词组装完成后：

### 路径 A：已安装且已审核的生图 skill

1. 先将龙虾名字规整为安全片段：仅保留字母、数字和连字符，其余字符替换为 `-`
2. 用 Write 工具写入：`/tmp/openclaw-<safe-name>-prompt.md`
3. 调用当前环境允许的生图 skill 生成图片
4. 用 Read 工具展示生成的图片给用户
5. 问用户是否满意，不满意可调整变量重新生成

### 路径 B：未安装可用的生图 skill

输出完整提示词文本，附手动使用说明：

```markdown
**头像提示词**（可复制到以下平台手动生成）：
- Google Gemini：直接粘贴
- ChatGPT（DALL-E）：直接粘贴
- Midjourney：粘贴后加 `--ar 1:1 --style raw`

> [完整英文提示词]

如当前环境后续提供经过审核的生图 skill，可再接回自动生图流程。
```

## 展示给用户的格式

```markdown
## 头像

**个性化变量**：
- 壳色：[SHELL_COLOR]
- 道具：[SIGNATURE_PROP]
- 表情：[EXPRESSION]
- 独特细节：[UNIQUE_DETAIL]
- 背景点缀：[BACKGROUND_ACCENT]
- 能量条标签：[ENERGY_BAR_LABEL]

**生成结果**：
[图片（路径A）或提示词文本（路径B）]

> 满意吗？不满意我可以调整 [具体可调项] 后重新生成。
```
