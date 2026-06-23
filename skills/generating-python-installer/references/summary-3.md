unittest,test,pytest,_pytest,doctest,pdb,pdbpp,
setuptools,pip,distutils,pkg_resources,
email.mime,http.server,xmlrpc,pydoc
```

**预期效果**：节省 **30-50 MB**

### 三、GUI 框架专用优化

#### Tkinter 极限优化（推荐，最轻量）
```bash
nuitka --standalone --windows-console-mode=disable ^
    --lto=yes ^
    --jobs=8 ^
    --enable-plugin=tk-inter ^
    --enable-plugin=anti-bloat ^
    --noinclude-pytest-mode=nofollow ^
    --noinclude-setuptools-mode=nofollow ^
    --nofollow-import-to=unittest,test,pytest,_pytest,doctest,pdb,pdbpp ^
    --nofollow-import-to=setuptools,pip,distutils,pkg_resources ^
    --nofollow-import-to=email.mime,http.server,xmlrpc,pydoc ^
    --python-flag=no_docstrings ^
    --output-dir=dist ^
    --windows-icon-from-ico=icon.ico ^
    --remove-output ^
    main.py
```

**预期体积**：80-120 MB（优化后）

#### PyQt5 / PySide2 优化
```bash
nuitka --standalone --windows-console-mode=disable ^
    --lto=yes ^
    --jobs=8 ^
    --enable-plugin=pyqt5 ^
    --enable-plugin=anti-bloat ^
    --noinclude-pytest-mode=nofollow ^
    --noinclude-setuptools-mode=nofollow ^
    --nofollow-import-to=unittest,test,pytest,_pytest,doctest,pdb ^
    --nofollow-import-to=setuptools,pip,distutils,pkg_resources ^
    --nofollow-import-to=PyQt5.QtWebEngine,PyQt5.QtWebEngineWidgets ^
    --nofollow-import-to=PyQt5.Qt3D,PyQt5.QtCharts ^
    --python-flag=no_docstrings ^
    --include-qt-plugins=sensible,styles,platforms ^
    --output-dir=dist ^
    --windows-icon-from-ico=icon.ico ^
    --remove-output ^
    main.py
```

**预期体积**：120-250 MB（优化后）

### 四、一键编译脚本模板

**保存为 `build_optimized.bat`（项目根目录）**：

```batch
@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo ========================================
echo Nuitka 极限优化编译（参考 参考项目）
echo ========================================

REM === 配置区域（请修改为你的实际值） ===
set APP_NAME=你的软件名
set MAIN_FILE=main.py
set ICON_FILE=icon.ico

REM === 自动检测 CPU 核心数 ===
REM 用 Windows 自带环境变量（wmic 在 Win11 22H2+ 已移除，探不到会让 --jobs=0 单线程编译）
set CPU_CORES=%NUMBER_OF_PROCESSORS%
if not defined CPU_CORES set CPU_CORES=4
set /a BUILD_JOBS=%CPU_CORES%

REM === 参考项目的模块排除清单 ===
set EXCLUDE_MODULES=unittest,test,pytest,_pytest,doctest,pdb,pdbpp
set EXCLUDE_MODULES=%EXCLUDE_MODULES%,setuptools,pip,distutils,pkg_resources
set EXCLUDE_MODULES=%EXCLUDE_MODULES%,email.mime,http.server,xmlrpc,pydoc

echo.
echo [1/4] 清理旧编译...
if exist dist rd /s /q dist
if exist build rd /s /q build

echo.
echo [2/4] Nuitka 编译中（应用 参考项目优化策略）...
echo - CPU 核心: %CPU_CORES% (使用 %BUILD_JOBS% 线程)

> Continued in [`summary-4.md`](summary-4.md)
