# Extended guidance


坚持 **"Nuitka 文件夹模式(dist) + Inno Setup 封装"** 方案。拒绝单文件版，拒绝黑窗。

---

## 实战参考案例（生产级 PySide2 桌面应用，323 MB，含 OpenCV / Playwright）

### 项目概况
- **总体积**: 323 MB
- **打包工具**: PyInstaller 4.7 (32位)
- **主要依赖**: PySide2 (22.52 MB), OpenCV (62.38 MB), Playwright (76.74 MB)
- **Python 版本**: Python 3.8 (32位)
- **DLL 数量**: 71 个，总计 93.23 MB

### 关键优化策略
1. PASS: **使用 32 位 Python** → 体积减少 20-30%
2. PASS: **base_library.zip 压缩标准库** → 0.74 MB
3. PASS: **精简模块排除** → 无 pytest/unittest/setuptools
4. PASS: **精简 Qt 插件** → 只保留必要插件

### 体积分布

| 组件 | 体积 | 占比 | 优化建议 |
|------|------|------|---------|
| playwright | 76.74 MB | 23.8% | 非必要可移除 |
| OpenCV | 62.38 MB | 19.3% | 用 opencv-python-headless |
| PySide2 | 22.52 MB | 7.0% | 排除 WebEngine/3D/Charts |
| 其他依赖 | 161.36 MB | 49.9% | - |

### 预期效果对比

| 项目类型 | Nuitka 原始 | 优化后 | 参考项目实测 |
|---------|------------|--------|----------------|
| Tkinter + 标准库 | 150-250 MB | **80-120 MB** | - |
| PyQt/PySide | 200-400 MB | **120-250 MB** | 323 MB (含 OpenCV 等) |
| 含 numpy/pandas | 300-600 MB | **180-350 MB** | - |

---

## 核心工作流 (Workflow) - WARNING: 严格执行

当用户请求打包时，按照以下步骤操作：

**步骤 1：强制参数确认（FAIL: 禁止使用默认值）**

> **WARNING: 重要规则：以下所有参数必须逐一向用户确认，禁止自动填充或使用默认值！**

必须向用户询问并确认以下信息（*等待用户明确回复后才能继续*）：

| 参数 | 说明 | 示例 |
|------|------|------|
| **软件名称** (App Name) | 软件显示名称 | `红墨批注` |
| **版本号** (Version) | 语义化版本号 | `1.0.0` |
| **发布者/公司名** (Publisher) | 控制面板显示的发布者 | `YourCompany` |
| **主程序** (Exe Name) | 主可执行文件名 | `RedInk.exe` |
| **源路径** (Source Dir) | Nuitka dist 文件夹绝对路径 | `D:\project\dist` |
| **输出路径** (Output Dir) | 安装包生成位置 | `D:\project\output` |

> Continued in [`summary-2.md`](summary-2.md)
