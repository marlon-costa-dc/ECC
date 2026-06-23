        id.value, name, email, role, metadata, createdAt, updatedAt
    )
}
```

## JSONB Column Type

```kotlin
inline fun <reified T : Any> Table.jsonb(name: String, json: Json): Column<T> =
    registerColumn(name, object : ColumnType<T>() {
        override fun sqlType() = "JSONB"
        override fun valueFromDB(value: Any): T = when (value) {
            is String -> json.decodeFromString(value)
            is PGobject -> json.decodeFromString(value.value!!)
            else -> throw IllegalArgumentException("Unexpected value: $value")
        }
        override fun notNullValueToDB(value: T): Any =
            PGobject().apply { type = "jsonb"; this.value = json.encodeToString(value) }
    })
```

## Testing with H2

```kotlin
class UserRepositoryTest : FunSpec({
    lateinit var database: Database
    lateinit var repository: UserRepository

    beforeSpec {
        database = Database.connect(
            url = "jdbc:h2:mem:test;DB_CLOSE_DELAY=-1;MODE=PostgreSQL",
            driver = "org.h2.Driver",
        )
        transaction(database) { SchemaUtils.create(UsersTable) }
        repository = ExposedUserRepository(database)
    }

    beforeTest {
        transaction(database) { UsersTable.deleteAll() }
    }

    test("create and find user") {
        val user = repository.create(CreateUserRequest("Alice", "alice@example.com"))
        repository.findById(user.id) shouldBe user
    }
})
```

## Gradle Dependencies

```kotlin
implementation("org.jetbrains.exposed:exposed-core:1.0.0")
implementation("org.jetbrains.exposed:exposed-dao:1.0.0")
implementation("org.jetbrains.exposed:exposed-jdbc:1.0.0")
implementation("org.jetbrains.exposed:exposed-kotlin-datetime:1.0.0")
implementation("org.jetbrains.exposed:exposed-json:1.0.0")
implementation("org.postgresql:postgresql:42.7.5")
implementation("com.zaxxer:HikariCP:6.2.1")
implementation("org.flywaydb:flyway-core:10.22.0")
implementation("org.flywaydb:flyway-database-postgresql:10.22.0")
testImplementation("com.h2database:h2:2.3.232")
```
