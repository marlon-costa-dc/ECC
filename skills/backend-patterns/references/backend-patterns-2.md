
```typescript
class ApiError extends Error {
  constructor(public statusCode: number, public message: string, public isOperational = true) {
    super(message)
  }
}

export function errorHandler(error: unknown) {
  if (error instanceof ApiError) {
    return NextResponse.json({ success: false, error: error.message }, { status: error.statusCode })
  }
  if (error instanceof z.ZodError) {
    return NextResponse.json({ success: false, error: 'Validation failed', details: error.errors }, { status: 400 })
  }
  console.error('Unexpected error:', error)
  return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
}
```

### Retry with Exponential Backoff

```typescript
async function fetchWithRetry<T>(fn: () => Promise<T>, maxRetries = 3): Promise<T> {
  let lastError: Error
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error
      if (i < maxRetries - 1) {
        await new Promise(r => setTimeout(r, Math.pow(2, i) * 1000))
      }
    }
  }
  throw lastError!
}
```

## Authentication & Authorization

### JWT Validation

```typescript
export function verifyToken(token: string): JWTPayload {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload
  } catch {
    throw new ApiError(401, 'Invalid token')
  }
}

export async function requireAuth(request: Request) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '')
  if (!token) throw new ApiError(401, 'Missing authorization token')
  return verifyToken(token)
}
```

### Role-Based Access Control

```typescript
type Permission = 'read' | 'write' | 'delete' | 'admin'

const rolePermissions: Record<User['role'], Permission[]> = {
  admin: ['read', 'write', 'delete', 'admin'],
  moderator: ['read', 'write', 'delete'],
  user: ['read', 'write']
}

export function hasPermission(user: User, permission: Permission): boolean {
  return rolePermissions[user.role].includes(permission)
}

export const DELETE = requirePermission('delete')(
  async (request: Request, user: User) => {
    return new Response('Deleted', { status: 200 })
  }
)
```

## Background Jobs

```typescript
class JobQueue<T> {
  private queue: T[] = []
  private processing = false

  async add(job: T): Promise<void> {
    this.queue.push(job)
    if (!this.processing) this.process()
  }

  private async process(): Promise<void> {
    this.processing = true
    while (this.queue.length > 0) {
      const job = this.queue.shift()!
      try { await this.execute(job) } catch (e) { console.error('Job failed:', e) }
    }
    this.processing = false
  }
}
```

## Structured Logging

```typescript
class Logger {
  log(level: 'info' | 'warn' | 'error', message: string, context?: Record<string, unknown>) {
    console.log(JSON.stringify({ timestamp: new Date().toISOString(), level, message, ...context }))
  }
  error(message: string, error: Error, context?: Record<string, unknown>) {
    this.log('error', message, { ...context, error: error.message, stack: error.stack })
  }
}
```

## Rate Limiting

Use a shared store (Redis, gateway, or platform limiter). Do not use per-process in-memory counters in production.
