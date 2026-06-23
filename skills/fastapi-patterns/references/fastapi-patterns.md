# FastAPI Patterns Reference

Detailed patterns for production-grade FastAPI applications.

## Project Structure

```text
my_app/
├── app/
│   ├── main.py               # App factory, lifespan, middleware
│   ├── config.py
│   ├── dependencies.py
│   ├── database.py
│   ├── routers/
│   │   └── users.py
│   ├── models/               # SQLAlchemy ORM models
│   ├── schemas/              # Pydantic request/response schemas
│   └── services/             # Business logic layer
├── tests/
│   ├── conftest.py
│   └── test_users.py
├── pyproject.toml
└── .env
```

## App Factory and Lifespan

```python
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    await engine.dispose()

def create_app() -> FastAPI:
    app = FastAPI(title=settings.app_name, version=settings.app_version, lifespan=lifespan)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.allowed_origins,
        allow_credentials=settings.allow_credentials,
        allow_methods=settings.allowed_methods,
        allow_headers=settings.allowed_headers,
    )
    app.include_router(users.router, prefix="/users", tags=["users"])
    return app
```

## Configuration

```python
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    app_name: str = "My App"
    app_version: str = "0.1.0"
    debug: bool = False
    database_url: str
    secret_key: str
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    allowed_origins: list[str] = ["http://localhost:3000"]
    allowed_methods: list[str] = ["GET", "POST", "PATCH", "DELETE", "OPTIONS"]
    allowed_headers: list[str] = ["Authorization", "Content-Type"]
    allow_credentials: bool = True

settings = Settings()
```

## Pydantic Schemas (v2)

```python
from pydantic import BaseModel, EmailStr, Field, model_validator

class UserBase(BaseModel):
    email: EmailStr
    username: str = Field(min_length=3, max_length=50)

class UserCreate(UserBase):
    password: str = Field(min_length=8)
    password_confirm: str

    @model_validator(mode="after")
    def passwords_match(self) -> "UserCreate":
        if self.password != self.password_confirm:
            raise ValueError("Passwords do not match")
        return self

class UserUpdate(BaseModel):
    username: str | None = Field(default=None, min_length=3, max_length=50)
    email: EmailStr | None = None

class UserResponse(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    model_config = {"from_attributes": True}

class UserListResponse(BaseModel):
    total: int
    items: list[UserResponse]
```

## Dependency Injection

```python
from typing import Annotated, AsyncGenerator
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.ext.asyncio import AsyncSession

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/users/token")

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        try:
            yield session
        except Exception:
            await session.rollback()
            raise

async def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)],
    db: Annotated[AsyncSession, Depends(get_db)],
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
        subject = payload.get("sub")
        if subject is None:
            raise credentials_exception
        user_id = int(subject)
    except (JWTError, TypeError, ValueError):
        raise credentials_exception

    user = await db.get(User, user_id)
    if user is None:
        raise credentials_exception
    return user

DbDep = Annotated[AsyncSession, Depends(get_db)]
CurrentUserDep = Annotated[User, Depends(get_current_user)]
```

## Router and Endpoints

```python
from fastapi import APIRouter, HTTPException, Query, status
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter()

@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user(payload: UserCreate, db: DbDep) -> UserResponse:
    try:
        return await UserService(db).create(payload)
    except DuplicateUserError:
        raise HTTPException(status_code=400, detail="Email already registered")

@router.get("/", response_model=UserListResponse)
async def list_users(
    db: DbDep,
    skip: Annotated[int, Query(ge=0)] = 0,
    limit: Annotated[int, Query(ge=1, le=100)] = 20,
) -> UserListResponse:
    users, total = await UserService(db).list(skip=skip, limit=limit)
    return UserListResponse(total=total, items=users)
```

## Service Layer

```python
class DuplicateUserError(Exception):
    pass

class UserService:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db

    async def create(self, payload: UserCreate) -> User:
        user = User(
            email=payload.email,
            username=payload.username,
            hashed_password=pwd_context.hash(payload.password),
        )
        self.db.add(user)
        try:
            await self.db.commit()
        except IntegrityError as exc:
            await self.db.rollback()
            raise DuplicateUserError from exc
        await self.db.refresh(user)
        return user

    async def list(self, skip: int = 0, limit: int = 20) -> tuple[list[User], int]:
        total = (await self.db.execute(select(func.count(User.id)))).scalar_one()
        result = await self.db.execute(select(User).order_by(User.id).offset(skip).limit(limit))
        return list(result.scalars()), total

    async def authenticate(self, email: str, password: str) -> str | None:
        user = await self.get_by_email(email)
        if user is None or not pwd_context.verify(password, user.hashed_password):
            return None
        expire = datetime.now(timezone.utc) + timedelta(minutes=settings.access_token_expire_minutes)
        return jwt.encode({"sub": str(user.id), "exp": expire}, settings.secret_key, algorithm=settings.algorithm)
```

## Testing with httpx and pytest

```python
import pytest_asyncio
from httpx import ASGITransport, AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

TEST_DATABASE_URL = "sqlite+aiosqlite:///:memory:"
engine = create_async_engine(TEST_DATABASE_URL)
TestingSessionLocal = async_sessionmaker(engine, expire_on_commit=False)

@pytest_asyncio.fixture(autouse=True)
async def setup_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)

@pytest_asyncio.fixture
async def client(db_session: AsyncSession):
    app = create_app()
    async def override_get_db():
        yield db_session
    app.dependency_overrides[get_db] = override_get_db
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        yield ac
```

## Anti-Patterns

```python
# Bad: business logic inside route handlers
@router.post("/users/")
async def create_user(payload: UserCreate, db: DbDep):
    hashed = bcrypt.hash(payload.password)
    user = User(email=payload.email, hashed_password=hashed)
    db.add(user)
    await db.commit()
    return user

# Good: thin route, transactional service
@router.post("/users/", response_model=UserResponse, status_code=201)
async def create_user(payload: UserCreate, db: DbDep):
    try:
        return await UserService(db).create(payload)
    except DuplicateUserError:
        raise HTTPException(status_code=400, detail="Email already registered")

# Bad: sync DB calls in async routes
@router.get("/items/")
async def list_items(db: Session = Depends(get_db)):
    return db.query(Item).all()

# Good: async SQLAlchemy
@router.get("/items/")
async def list_items(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Item))
    return result.scalars().all()
```
