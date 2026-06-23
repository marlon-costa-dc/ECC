# Flutter/Dart Code Review — Operations

## Accessibility

- Use `Semantics` for screen reader labels where automatic labels are insufficient
- Use `ExcludeSemantics` for decorative elements and `MergeSemantics` to group related widgets
- Images have `semanticLabel` set
- All interactive elements are focusable with meaningful descriptions
- Focus order follows visual reading order
- Contrast ratio >= 4.5:1 for text
- Tappable targets are at least 48x48 pixels
- Color is not the sole indicator of state
- Text scales with system font size settings

## Platform-Specific Concerns

- Use platform-adaptive widgets where appropriate
- Handle back navigation correctly (Android back button, iOS swipe-to-go-back)
- Use `SafeArea` for status bar and safe area
- Declare platform-specific permissions in `AndroidManifest.xml` and `Info.plist`
- Use `LayoutBuilder` or `MediaQuery` for responsive layouts
- Define consistent breakpoints (phone, tablet, desktop)
- Use `Flexible`, `Expanded`, `FittedBox` to prevent overflow

## Security

- Store sensitive data in platform-secure storage (iOS Keychain, Android EncryptedSharedPreferences)
- Never store secrets in plaintext
- Do not hardcode API keys in Dart source; use `--dart-define` or excluded `.env` files
- Use a backend proxy for truly secret keys
- Validate all user input before sending to APIs
- Use proper form validation patterns
- No raw SQL or string interpolation of user input
- Validate and sanitize deep link URLs before navigation
- Enforce HTTPS for all API calls
- Refresh and expire authentication tokens properly
- No sensitive data logged or printed

## Package and Dependency Review

- Check pub points score (aim for 130+/160), likes, and popularity
- Review last publish date; stale packages (>1 year) are a risk
- Check license compatibility and platform support
- Use caret syntax (`^1.2.3`) unless exact pinning is necessary
- Run `flutter pub outdated` regularly
- Minimize transitive dependencies
- In monorepos: import only public APIs, use workspace resolution, share root `analysis_options.yaml`

## Navigation and Routing

- Use one routing approach consistently
- Type route arguments; no `Map<String, dynamic>` or `Object?` casting
- Define route paths as constants, enums, or generated values
- Centralize auth guards/redirects
- Configure deep links for Android and iOS
- Validate and sanitize deep link URLs

## Error Handling

- Override `FlutterError.onError` for framework errors
- Set `PlatformDispatcher.instance.onError` for async errors
- Customize `ErrorWidget.builder` for release mode
- Wrap `runApp` with global error capture (e.g., Sentry/Crashlytics)
- Integrate an error reporting service with stack traces
- Map API errors to user-friendly UI; never show raw exception strings
- Implement retry for transient failures
- Handle offline state gracefully

## Internationalization (l10n)

- Configure a localization solution (ARB/l10n, easy_localization, etc.)
- Declare supported locales
- All user-visible strings use the localization system
- Use ICU message syntax for plurals, genders, selects
- Define typed placeholders
- Use locale-aware date, time, number, and currency formatting

## Dependency Injection

- Depend on abstractions at layer boundaries
- Provide dependencies externally via constructor, DI framework, or provider graph
- Distinguish singleton vs factory vs lazy singleton lifetimes
- No circular dependencies in the DI graph
- Avoid scattering service locator calls through business logic

## Static Analysis

- Provide `analysis_options.yaml` with strict settings
- Enable `strict-casts`, `strict-inference`, `strict-raw-types`
- Include a comprehensive lint set (very_good_analysis, flutter_lints, or strict custom rules)
- In monorepos, inherit or share root analysis options
- No unresolved analyzer warnings in committed code
- Run `flutter analyze` in CI and block merges on failures

## Sources

- [Effective Dart](https://dart.dev/effective-dart)
- [Flutter Performance Best Practices](https://docs.flutter.dev/perf/best-practices)
- [Flutter Testing Overview](https://docs.flutter.dev/testing/overview)
- [Flutter Accessibility](https://docs.flutter.dev/ui/accessibility-and-internationalization/accessibility)
- [Flutter Internationalization](https://docs.flutter.dev/ui/accessibility-and-internationalization/internationalization)
- [Flutter Navigation and Routing](https://docs.flutter.dev/ui/navigation)
- [Flutter Error Handling](https://docs.flutter.dev/testing/errors)
- [Flutter State Management Options](https://docs.flutter.dev/data-and-backend/state-mgmt/options)
