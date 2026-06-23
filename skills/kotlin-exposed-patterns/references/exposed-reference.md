# Exposed Reference

Detailed examples for the `kotlin-exposed-patterns` skill.

## HikariCP Configuration

```kotlin
object DatabaseFactory {
    fun create(config: DatabaseConfig): Database {
        val hikariConfig = HikariConfig().apply {
            driverClassName = config.driver
            jdbcUrl = config.url
            username = config.username
            password = config.password
            maximumPoolSize = config.maxPoolSize
            isAutoCommit = false
            transactionIsolation = "TRANSACTION_READ_COMMITTED"
            validate()
        }
        return Database.connect(HikariDataSource(hikariConfig))
    }
}

data class DatabaseConfig(
    val url: String,
    val driver: String = "org.postgresql.Driver",
    val username: String = "",
    val password: String = "",
    val maxPoolSize: Int = 10,
)
```

## Flyway Migrations

```kotlin
fun runMigrations(config: DatabaseConfig) {
    Flyway.configure()
        .dataSource(config.url, config.username, config.password)
        .locations("classpath:db/migration")
        .baselineOnMigrate(true)
        .load()
        .migrate()
}
```

Example migration:

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(20) NOT NULL DEFAULT 'USER',
    metadata JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_users_email ON users(email);
```

## Table Definitions

```kotlin
object UsersTable : UUIDTable("users") {
    val name = varchar("name", 100)
    val email = varchar("email", 255).uniqueIndex()
    val role = enumerationByName<Role>("role", 20)
    val metadata = jsonb<UserMetadata>("metadata", Json.Default).nullable()
    val createdAt = timestampWithTimeZone("created_at").defaultExpression(CurrentTimestampWithTimeZone)
    val updatedAt = timestampWithTimeZone("updated_at").defaultExpression(CurrentTimestampWithTimeZone)
}

object OrdersTable : UUIDTable("orders") {
    val userId = uuid("user_id").references(UsersTable.id)
    val status = enumerationByName<OrderStatus>("status", 20)
    val totalAmount = long("total_amount")
    val createdAt = timestampWithTimeZone("created_at").defaultExpression(CurrentTimestampWithTimeZone)
}
```

## DSL Queries

```kotlin
suspend fun findUserById(id: UUID): UserRow? =
    newSuspendedTransaction {
        UsersTable.selectAll()
            .where { UsersTable.id eq id }
            .map { it.toUser() }
            .singleOrNull()
    }

suspend fun updateUserEmail(id: UUID, newEmail: String): Boolean =
    newSuspendedTransaction {
        UsersTable.update({ UsersTable.id eq id }) {
            it[email] = newEmail
            it[updatedAt] = CurrentTimestampWithTimeZone
        } > 0
    }

suspend fun findOrdersWithUser(userId: UUID): List<OrderWithUser> =
    newSuspendedTransaction {
        (OrdersTable innerJoin UsersTable)
            .selectAll()
            .where { OrdersTable.userId eq userId }
            .orderBy(OrdersTable.createdAt, SortOrder.DESC)
            .map { row ->
                OrderWithUser(
                    orderId = row[OrdersTable.id].value,
                    status = row[OrdersTable.status],
                    totalAmount = row[OrdersTable.totalAmount],
                    userName = row[UsersTable.name],
                )
            }
    }
```

## DAO Pattern

```kotlin
class UserEntity(id: EntityID<UUID>) : UUIDEntity(id) {
    companion object : UUIDEntityClass<UserEntity>(UsersTable)

    var name by UsersTable.name
    var email by UsersTable.email
    var role by UsersTable.role
    var metadata by UsersTable.metadata
    var createdAt by UsersTable.createdAt
    var updatedAt by UsersTable.updatedAt
    val orders by OrderEntity referrersOn OrdersTable.userId

    fun toModel(): User = User(
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
