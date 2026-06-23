# Security Checklist and Examples

Detailed checklist and code examples for the security-review skill.

## 1. Secrets Management

```typescript
// FAIL
const apiKey = "sk-proj-xxxxx"

// PASS
const apiKey = process.env.OPENAI_API_KEY
if (!apiKey) throw new Error('OPENAI_API_KEY not configured')
```

- [ ] No hardcoded API keys, tokens, or passwords
- [ ] All secrets in environment variables
- [ ] `.env.local` in .gitignore
- [ ] Production secrets in hosting platform

## 2. Input Validation

```typescript
import { z } from 'zod'

const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  age: z.number().int().min(0).max(150)
})

const validated = CreateUserSchema.parse(input)
```

- [ ] All user inputs validated with schemas
- [ ] File uploads restricted (size, type, extension)
- [ ] Whitelist validation (not blacklist)

## 3. SQL Injection Prevention

```typescript
// PASS: parameterized query
await db.query('SELECT * FROM users WHERE email = $1', [userEmail])
```

- [ ] All database queries use parameterized queries
- [ ] No string concatenation in SQL

## 4. Authentication & Authorization

```typescript
// FAIL: localStorage (XSS)
localStorage.setItem('token', token)

// PASS: httpOnly cookie
res.setHeader('Set-Cookie',
  `token=${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=3600`)
```

```typescript
export async function deleteUser(userId: string, requesterId: string) {
  const requester = await db.users.findUnique({ where: { id: requesterId } })
  if (requester.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }
  await db.users.delete({ where: { id: userId } })
}
```

```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own data" ON users FOR SELECT
  USING (auth.uid() = id);
```

- [ ] Tokens stored in httpOnly/Secure/SameSite=Strict cookies
- [ ] Authorization checks before sensitive operations
- [ ] Row Level Security enabled in Supabase

## 5. XSS Prevention

```typescript
import DOMPurify from 'isomorphic-dompurify'

function renderUserContent(html: string) {
  const clean = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p'],
    ALLOWED_ATTR: []
  })
  return <div dangerouslySetInnerHTML={{ __html: clean }} />
}
```

- [ ] User-provided HTML sanitized
- [ ] CSP headers configured

## 6. CSRF Protection

```typescript
const token = request.headers.get('X-CSRF-Token')
if (!csrf.verify(token)) {
  return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 })
}
```

- [ ] CSRF tokens on state-changing operations
- [ ] SameSite=Strict on all cookies

## 7. Rate Limiting

```typescript
import rateLimit from 'express-rate-limit'
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })
app.use('/api/', limiter)
```

- [ ] Rate limiting on all API endpoints
- [ ] Stricter limits on expensive operations

## 8. Sensitive Data Exposure

```typescript
// FAIL
console.log('User login:', { email, password })
// PASS
console.log('User login:', { email, userId })
```

```typescript
// FAIL
catch (error) {
  return NextResponse.json({ error: error.message, stack: error.stack }, { status: 500 })
}

// PASS
catch (error) {
  console.error('Internal error:', error)
  return NextResponse.json({ error: 'An error occurred.' }, { status: 500 })
}
```

- [ ] No passwords, tokens, or secrets in logs
- [ ] Error messages generic for users

## 9. Dependency Security

```bash
npm audit
npm audit fix
npm update
```

- [ ] Dependencies up to date
- [ ] No known vulnerabilities
- [ ] Lock files committed

## External Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/security)
