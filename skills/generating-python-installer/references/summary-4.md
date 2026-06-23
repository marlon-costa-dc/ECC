echo - 模块排除: %EXCLUDE_MODULES%
echo.

nuitka --standalone ^
    --windows-console-mode=disable ^
    --lto=yes ^
    --jobs=%BUILD_JOBS% ^
    --enable-plugin=anti-bloat ^
    --enable-plugin=tk-inter ^
    --noinclude-pytest-mode=nofollow ^
    --noinclude-setuptools-mode=nofollow ^
    --nofollow-import-to=%EXCLUDE_MODULES% ^
    --python-flag=no_docstrings ^
    --output-dir=dist ^
    --windows-icon-from-ico=%ICON_FILE% ^
    --remove-output ^
    %MAIN_FILE%

if %errorlevel% neq 0 (
    echo.
    echo [错误] 编译失败！
    pause
    exit /b 1
)

echo.
echo [3/4] 统计编译结果...
for /f %%a in ('powershell -NoProfile -Command "(Get-ChildItem -LiteralPath 'dist\%APP_NAME%.dist' -Recurse -File | Measure-Object -Property Length -Sum).Sum"') do set TOTAL_SIZE=%%a
set TOTAL_SIZE=%TOTAL_SIZE:,=%
set /a SIZE_MB=%TOTAL_SIZE% / 1048576
echo - 编译后体积: %SIZE_MB% MB

echo.
echo [4/4] 执行瘦身清理（参考 参考项目策略）...
powershell -ExecutionPolicy Bypass -File slim_dist.ps1 -DistPath "dist\%APP_NAME%.dist"

echo.
echo ========================================
echo 编译完成！
echo ========================================
pause
```

### 五、dist 瘦身脚本（参考项目级别清理）

**保存为 `slim_dist.ps1`（和 build_optimized.bat 同目录）**：

```powershell
param(
    [string]$DistPath
)

$ErrorActionPreference = "Continue"  # 不静默吞错：删除失败会显示出来，避免假成功

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "dist 瘦身清理（参考 参考项目策略）" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

if (-not (Test-Path $DistPath)) {
    Write-Host "[错误] 找不到目录: $DistPath" -ForegroundColor Red
    exit 1
}

# 统计初始体积
$InitialSize = (Get-ChildItem -Path $DistPath -Recurse -File | Measure-Object -Property Length -Sum).Sum / 1MB
Write-Host "`n初始体积: $([math]::Round($InitialSize, 2)) MB" -ForegroundColor Yellow

# 参考项目特征：没有 .pdb, .pyi, __pycache__, test 等
Write-Host "`n[应用 参考项目的清理策略...]" -ForegroundColor Green

# 1. 删除调试符号
Write-Host "`n[1/7] 删除 .pdb 调试符号..." -ForegroundColor Green
$pdbFiles = Get-ChildItem -Path $DistPath -Recurse -Include *.pdb -File
$pdbSize = ($pdbFiles | Measure-Object -Property Length -Sum).Sum / 1MB
if ($pdbFiles.Count -gt 0) {
    $pdbFiles | Remove-Item -Force
    Write-Host "  删除 $($pdbFiles.Count) 个文件，节省 $([math]::Round($pdbSize, 2)) MB"
} else {
    Write-Host "  未发现 .pdb 文件（已优化）" -ForegroundColor Gray
}

# 2. 删除类型提示
Write-Host "`n[2/7] 删除 .pyi 类型提示..." -ForegroundColor Green

> Continued in [`summary-5.md`](summary-5.md)
