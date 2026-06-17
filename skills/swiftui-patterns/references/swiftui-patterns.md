# SwiftUI Patterns — Reference

## Property Wrapper Selection

| Wrapper | Use Case |
|---------|----------|
| `@State` | View-local value types |
| `@Binding` | Two-way reference to parent's `@State` |
| `@Observable` class + `@State` | Owned model with multiple properties |
| `@Observable` class (no wrapper) | Read-only reference passed from parent |
| `@Bindable` | Two-way binding to an `@Observable` property |
| `@Environment` | Shared dependencies injected via `.environment()` |

## @Observable ViewModel

```swift
@Observable
final class ItemListViewModel {
    private(set) var items: [Item] = []
    private(set) var isLoading = false
    var searchText = ""
    private let repository: any ItemRepository

    init(repository: any ItemRepository = DefaultItemRepository()) {
        self.repository = repository
    }

    func load() async {
        isLoading = true
        defer { isLoading = false }
        items = (try? await repository.fetchAll()) ?? []
    }
}
```

## View Consuming the ViewModel

```swift
struct ItemListView: View {
    @State private var viewModel: ItemListViewModel

    init(viewModel: ItemListViewModel = ItemListViewModel()) {
        _viewModel = State(initialValue: viewModel)
    }

    var body: some View {
        List(viewModel.items) { item in ItemRow(item: item) }
            .searchable(text: $viewModel.searchText)
            .overlay { if viewModel.isLoading { ProgressView() } }
            .task { await viewModel.load() }
    }
}
```

## Environment Injection

```swift
// Inject
ContentView().environment(authManager)

// Consume
struct ProfileView: View {
    @Environment(AuthManager.self) private var auth
    var body: some View { Text(auth.currentUser?.name ?? "Guest") }
}
```

## View Composition

```swift
struct OrderView: View {
    @State private var viewModel = OrderViewModel()
    var body: some View {
        VStack {
            OrderHeader(title: viewModel.title)
            OrderItemList(items: viewModel.items)
            OrderTotal(total: viewModel.total)
        }
    }
}
```

## Reusable Styling with ViewModifier

```swift
struct CardModifier: ViewModifier {
    func body(content: Content) -> some View {
        content
            .padding()
            .background(.regularMaterial)
            .clipShape(RoundedRectangle(cornerRadius: 12))
    }
}

extension View {
    func cardStyle() -> some View { modifier(CardModifier()) }
}
```

## Type-Safe NavigationStack

```swift
@Observable
final class Router {
    var path = NavigationPath()
    func navigate(to destination: Destination) { path.append(destination) }
    func popToRoot() { path = NavigationPath() }
}

enum Destination: Hashable {
    case detail(Item.ID)
    case settings
    case profile(User.ID)
}

struct RootView: View {
    @State private var router = Router()
    var body: some View {
        NavigationStack(path: $router.path) {
            HomeView()
                .navigationDestination(for: Destination.self) { dest in
                    switch dest {
                    case .detail(let id): ItemDetailView(itemID: id)
                    case .settings: SettingsView()
                    case .profile(let id): ProfileView(userID: id)
                    }
                }
        }
        .environment(router)
    }
}
```

## Performance Patterns

Use lazy containers and stable identifiers:

```swift
ScrollView {
    LazyVStack(spacing: 8) {
        ForEach(items) { item in ItemRow(item: item) }
    }
}
```

For expensive bodies, conform to `Equatable`:

```swift
struct ExpensiveChartView: View, Equatable {
    let dataPoints: [DataPoint]
    static func == (lhs: Self, rhs: Self) -> Bool { lhs.dataPoints == rhs.dataPoints }
    var body: some View { /* complex chart */ }
}
```

## Anti-Patterns

- Using `ObservableObject` / `@Published` / `@StateObject` / `@EnvironmentObject` in new code
- Putting async work directly in `body` or `init`
- Creating view models as `@State` inside child views that do not own the data
- Using `AnyView` instead of `@ViewBuilder` or `Group`
- Ignoring `Sendable` requirements when passing data to/from actors
