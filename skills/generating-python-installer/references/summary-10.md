Source: "{#MySourceDir}\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs

[UninstallDelete]
Type: filesandordirs; Name: "{app}\*"

[Icons]
Name: "{autodesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: desktopicon
Name: "{group}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"
Name: "{group}\卸载 {#MyAppName}"; Filename: "{uninstallexe}"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "{cm:LaunchProgram,{#MyAppName}}"; Flags: nowait postinstall skipifsilent
```

---

## 占位符说明

| 占位符 | 说明 | 示例值 |
|--------|------|--------|
| `{{APP_NAME}}` | 软件显示名称 | `红墨批注` |
| `{{APP_VERSION}}` | 版本号 | `1.0.0` |
| `{{PUBLISHER}}` | 发布者/公司名 | `MyCompany` |
| `{{APP_URL}}` | 官网地址 | `https://example.com` |
| `{{EXE_NAME}}` | 主程序文件名 | `RedInk.exe` |
| `{{SOURCE_DIR}}` | Nuitka dist 文件夹路径 | `D:\project\dist\RedInk.dist` |
| `{{OUTPUT_DIR}}` | 安装包输出路径 | `D:\project\output` |
| `{{ICON_PATH}}` | 图标文件路径 | `D:\project\icon.ico` |
| `{{GENERATE_RANDOM_GUID}}` | **需生成唯一GUID** | 使用 Inno Setup "Tools > Generate GUID" |

---

## 常见问题 (FAQ)

### Q1: 安装后双击程序无反应？
1. 打开 CMD，手动运行 exe 查看错误信息
2. 检查是否缺少 VC++ 运行库
3. 检查 Nuitka 编译是否成功

### Q2: 安装包体积过大？
**优化方法**：
1. 使用 32 位 Python 编译（节省 20-30%）
2. 应用 参考项目的模块排除清单
3. 启用 Anti-Bloat 插件
4. 执行 dist 文件夹瘦身脚本
5. 分析 DLL，移除不必要的大文件

### Q3: 杀毒软件误报？
**解决方案**：
- 提交到主流杀毒厂商进行白名单申请
- 购买代码签名证书（推荐：Sectigo, DigiCert）
- 避免使用 UPX 压缩

### Q4: 安装时提示 Windows 已保护你的电脑？
- 购买 EV 代码签名证书（可立即获得信任）
- 普通代码签名证书需要积累安装量后逐渐获得信任

---

## 实战问题处理记录（更新 2026-02-07）

- **安装后提示缺少 python3xx.dll**：必须使用 Nuitka `--standalone`；确认 dist 内存在该 dll；不要打单文件版。

> Continued in [`summary-11.md`](summary-11.md)
