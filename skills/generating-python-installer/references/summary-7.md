        print(f"[错误] 目录不存在: {dist_path}")
        return

    print("=" * 70)
    print("DLL 依赖分析（参考 参考项目策略）")
    print("=" * 70)

    # 收集所有 DLL
    dll_files = list(dist_dir.rglob("*.dll"))

    if not dll_files:
        print("\n未发现 DLL 文件")
        return

    # 按大小排序
    dll_data = [(dll, dll.stat().st_size) for dll in dll_files]
    dll_data.sort(key=lambda x: x[1], reverse=True)

    total_size = sum(size for _, size in dll_data)

    print(f"\n总 DLL 数量: {len(dll_files)}")
    print(f"总 DLL 体积: {total_size / 1024 / 1024:.2f} MB\n")

    # 参考项目对比
    print("[对比参考] 参考项目的 DLL 情况:")
    print("  - 总数量: 71 个")
    print("  - 总体积: 93.23 MB")
    print("  - 最大的: libopenblas (26.85 MB), opengl32sw (15.25 MB)\n")

    # 分析大于 3MB 的 DLL
    large_dlls = [(dll, size) for dll, size in dll_data if size > 3 * 1024 * 1024]

    if large_dlls:
        print("=" * 70)
        print("WARNING:  大于 3MB 的 DLL（需重点关注）")
        print("=" * 70)

        for dll, size in large_dlls:
            size_mb = size / 1024 / 1024
            relative_path = dll.relative_to(dist_dir)
            name_lower = dll.name.lower()

            print(f"\n{size_mb:8.2f} MB  {dll.name}")
            print(f"           位置: {relative_path.parent}")

            # 优化建议
            suggestions = get_optimization_suggestion(name_lower)
            if suggestions:
                for suggestion in suggestions:
                    print(f"            {suggestion}")

    # 检查冗余 DLL
    print("\n" + "=" * 70)
    print(" 冗余检查")
    print("=" * 70)

    # 检查调试版本
    debug_dlls = [dll for dll, _ in dll_data if dll.stem.endswith('d')]
    if debug_dlls:
        print(f"\nWARNING:  发现 {len(debug_dlls)} 个调试版本 DLL（可以删除）:")
        for dll in debug_dlls:
            print(f"  - {dll.name}")
    else:
        print("\nPASS: 未发现调试版本 DLL（已优化）")

    # VC++ Runtime
    vc_runtimes = [dll for dll, _ in dll_data if 'vcruntime' in dll.name.lower() or 'msvcp' in dll.name.lower()]
    if vc_runtimes:
        print(f"\n[VC++ Runtime 库] 发现 {len(vc_runtimes)} 个:")
        for dll in vc_runtimes:
            size_mb = dll.stat().st_size / 1024 / 1024
            print(f"  - {dll.name} ({size_mb:.2f} MB)")
        print("   这些是必需的，参考项目也包含了这些文件")

    # 全部 DLL 列表
    print("\n" + "=" * 70)
    print(" 完整 DLL 列表（按体积排序，前 20）")
    print("=" * 70)
    print(f"\n{'体积 (MB)':>10}  {'文件名':<30}  位置")
    print("-" * 70)

    for dll, size in dll_data[:20]:
        size_mb = size / 1024 / 1024

> Continued in [`summary-8.md`](summary-8.md)
