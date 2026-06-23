    $pycFiles | Remove-Item -Force
    Write-Host "  删除 $($pycFiles.Count) 个文件，节省 $([math]::Round($pycSize, 2)) MB"
} else {
    Write-Host "  未发现 .pyc 文件（已优化）" -ForegroundColor Gray
}

# 7. 精简 .dist-info 元数据
Write-Host "`n[7/7] 精简 .dist-info 元数据..." -ForegroundColor Green
$distInfoDirs = Get-ChildItem -Path $DistPath -Recurse -Directory -Filter "*.dist-info"
$removedCount = 0
$removedSize = 0
foreach ($infoDir in $distInfoDirs) {
    # 仅删安装期记账文件；保留 METADATA 与 entry_points.txt（运行期被 importlib.metadata 读取，删除会破坏插件发现）
    $filesToRemove = @("RECORD", "INSTALLER", "direct_url.json")
    foreach ($fileName in $filesToRemove) {
        $file = Join-Path $infoDir.FullName $fileName
        if (Test-Path $file) {
            $size = (Get-Item $file).Length
            $removedSize += $size
            Remove-Item $file -Force
            $removedCount++
        }
    }
}
if ($removedCount -gt 0) {
    Write-Host "  删除 $removedCount 个元数据文件，节省 $([math]::Round($removedSize / 1MB, 2)) MB"
} else {
    Write-Host "  未发现可清理的元数据（已优化）" -ForegroundColor Gray
}

# 统计最终体积
$FinalSize = (Get-ChildItem -Path $DistPath -Recurse -File | Measure-Object -Property Length -Sum).Sum / 1MB
$SavedSize = $InitialSize - $FinalSize
$SavedPercent = if ($InitialSize -gt 0) { ($SavedSize / $InitialSize) * 100 } else { 0 }

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "清理完成！" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "初始体积: $([math]::Round($InitialSize, 2)) MB" -ForegroundColor Yellow
Write-Host "最终体积: $([math]::Round($FinalSize, 2)) MB" -ForegroundColor Green
Write-Host "节省空间: $([math]::Round($SavedSize, 2)) MB ($([math]::Round($SavedPercent, 1))%)" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# 对比 参考项目
Write-Host "[对比参考]" -ForegroundColor Yellow
Write-Host "参考项目总体积: 323 MB (包含 PyQt, OpenCV, Playwright 等重量级库)" -ForegroundColor Gray
Write-Host "如果你的项目是纯 Tkinter + 标准库，目标应该在 80-150 MB" -ForegroundColor Gray
```

**预期效果**：节省 **15-30%** 体积

### 六、DLL 依赖分析工具

**保存为 `analyze_dlls.py`（用于找出体积大户）**：

```python
"""
DLL 依赖分析工具
参考 参考项目的 DLL 管理策略，帮助识别体积大户和优化建议
"""
import sys
from pathlib import Path

def analyze_dlls(dist_path: str):
    """分析 dist 目录中的 DLL 依赖"""
    dist_dir = Path(dist_path)

    if not dist_dir.exists():

> Continued in [`summary-7.md`](summary-7.md)
