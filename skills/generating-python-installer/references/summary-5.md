$pyiFiles = Get-ChildItem -Path $DistPath -Recurse -Include *.pyi -File
$pyiSize = ($pyiFiles | Measure-Object -Property Length -Sum).Sum / 1MB
if ($pyiFiles.Count -gt 0) {
    $pyiFiles | Remove-Item -Force
    Write-Host "  删除 $($pyiFiles.Count) 个文件，节省 $([math]::Round($pyiSize, 2)) MB"
} else {
    Write-Host "  未发现 .pyi 文件（已优化）" -ForegroundColor Gray
}

# 3. 删除 __pycache__
Write-Host "`n[3/7] 删除 __pycache__ 缓存..." -ForegroundColor Green
$pycacheDirs = Get-ChildItem -Path $DistPath -Recurse -Directory -Filter "__pycache__"
$pycacheSize = 0
foreach ($dir in $pycacheDirs) {
    $size = (Get-ChildItem -Path $dir.FullName -Recurse -File | Measure-Object -Property Length -Sum).Sum
    $pycacheSize += $size
    Remove-Item -Path $dir.FullName -Recurse -Force
}
if ($pycacheDirs.Count -gt 0) {
    Write-Host "  删除 $($pycacheDirs.Count) 个目录，节省 $([math]::Round($pycacheSize / 1MB, 2)) MB"
} else {
    Write-Host "  未发现 __pycache__（已优化）" -ForegroundColor Gray
}

# 4. 删除测试目录
Write-Host "`n[4/7] 删除 test/tests 测试目录..." -ForegroundColor Green
$testDirs = Get-ChildItem -Path $DistPath -Recurse -Directory | Where-Object { $_.Name -match '^tests?$' }
$testSize = 0
foreach ($dir in $testDirs) {
    $size = (Get-ChildItem -Path $dir.FullName -Recurse -File | Measure-Object -Property Length -Sum).Sum
    $testSize += $size
    Remove-Item -Path $dir.FullName -Recurse -Force
}
if ($testDirs.Count -gt 0) {
    Write-Host "  删除 $($testDirs.Count) 个目录，节省 $([math]::Round($testSize / 1MB, 2)) MB"
} else {
    Write-Host "  未发现测试目录（已优化）" -ForegroundColor Gray
}

# 5. 删除文档和示例
Write-Host "`n[5/7] 删除 docs/examples 文档目录..." -ForegroundColor Green
$docDirs = Get-ChildItem -Path $DistPath -Recurse -Directory | Where-Object { $_.Name -match '^(docs|examples|samples|demo)$' }
$docSize = 0
foreach ($dir in $docDirs) {
    $size = (Get-ChildItem -Path $dir.FullName -Recurse -File | Measure-Object -Property Length -Sum).Sum
    $docSize += $size
    Remove-Item -Path $dir.FullName -Recurse -Force
}
if ($docDirs.Count -gt 0) {
    Write-Host "  删除 $($docDirs.Count) 个目录，节省 $([math]::Round($docSize / 1MB, 2)) MB"
} else {
    Write-Host "  未发现文档目录（已优化）" -ForegroundColor Gray
}

# 6. 删除 .pyc 文件
Write-Host "`n[6/7] 删除 .pyc 字节码..." -ForegroundColor Green
$pycFiles = Get-ChildItem -Path $DistPath -Recurse -Include *.pyc -File
$pycSize = ($pycFiles | Measure-Object -Property Length -Sum).Sum / 1MB
if ($pycFiles.Count -gt 0) {

> Continued in [`summary-6.md`](summary-6.md)
