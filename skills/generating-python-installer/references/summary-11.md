- **安装后点击无反应**：GUI 启动期可能被重依赖阻塞；将重依赖延迟到"开始导出"再 import；添加日志排查。
- **Nuitka + MinGW 在非 ASCII 路径报错**：把源码复制到 ASCII 目录再编译；设置 `PYTHONIOENCODING=utf-8`。
- **Inno Setup 警告 `x64` 已弃用（仅 64 位构建需要 64 位安装模式时）**：改为 `ArchitecturesInstallIn64BitMode=x64compatible`；32 位构建无需此项。
- **`--disable-console` 已废弃**：改用 `--windows-console-mode=disable`。
- **dist 出现 `_nuitka_temp.exe`**：在 [Files] 中排除它。

---

## 优化效果预期

| 优化组合 | 体积减少 | 启动提升 | 风险等级 |
|----------|----------|----------|----------|
| 基础编译 | 基准 | 基准 | 无 |
| + `--lto=yes` | 5-10% | 10-20% | PASS: 无 |
| + anti-bloat | 15-25% | - | PASS: 无 |
| + 模块排除 | 20-35% | 5% | PASS: 无 |
| + dist 瘦身 | 25-40% | - | PASS: 无 |
| + 32 位编译 | 40-60% | - | PASS: 无 |
| **全部组合** | **45-65%** | **15-25%** | PASS: **无风险** |

> WARNING: **不建议使用 UPX 压缩**，虽然能进一步减小体积，但极易触发杀毒软件误报。

---

**基于 参考项目实战经验优化，助你打造商业级安装包！**
