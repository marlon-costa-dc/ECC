# Backend Patterns Reference

Detailed patterns for scalable server-side applications.

## RESTful API Structure

```typescript
GET    /api/markets
GET    /api/markets/:id
POST   /api/markets
PUT    /api/markets/:id
PATCH  /api/markets/:id
DELETE /api/markets/:id

GET /api/markets?status=active&sort=volume&limit=20&offset=0
```

## Repository Pattern

```typescript
interface MarketRepository {
  findAll(filters?: MarketFilters): Promise<Market[]>
  findById(id: string): Promise<Market | null>
  create(data: CreateMarketDto): Promise<Market>
  update(id: string, data: UpdateMarketDto): Promise<Market>
  delete(id: string): Promise<void>
}

class SupabaseMarketRepository implements MarketRepository {
  async findAll(filters?: MarketFilters): Promise<Market[]> {
    let query = supabase.from('markets').select('id, name, status, volume')
    if (filters?.status) query = query.eq('status', filters.status)
    if (filters?.limit) query = query.limit(filters.limit)
    const { data, error } = await query
    if (error) throw new Error(error.message)
    return data
  }
}
```

## Service Layer Pattern

```typescript
class MarketService {
  constructor(private marketRepo: MarketRepository) {}

  async searchMarkets(query: string, limit = 10): Promise<Market[]> {
    const embedding = await generateEmbedding(query)
    const results = await this.vectorSearch(embedding, limit)
    const markets = await this.marketRepo.findByIds(results.map(r => r.id))
    return markets.sort((a, b) => {
      const scoreA = results.find(r => r.id === a.id)?.score || 0
      const scoreB = results.find(r => r.id === b.id)?.score || 0
      return scoreA - scoreB
    })
  }
}
```

## Middleware Pattern

```typescript
export function withAuth(handler: NextApiHandler): NextApiHandler {
  return async (req, res) => {
    const token = req.headers.authorization?.replace('Bearer ', '')
    if (!token) return res.status(401).json({ error: 'Unauthorized' })
    try {
      req.user = await verifyToken(token)
      return handler(req, res)
    } catch {
      return res.status(401).json({ error: 'Invalid token' })
    }
  }
}
```

## Database Patterns

### Select Only Needed Columns

```typescript
const { data } = await supabase
  .from('markets')
  .select('id, name, status, volume')
  .eq('status', 'active')
  .order('volume', { ascending: false })
  .limit(10)
```

### N+1 Prevention

```typescript
// BAD
const markets = await getMarkets()
for (const market of markets) {
  market.creator = await getUser(market.creator_id)
}

// GOOD
const markets = await getMarkets()
const creators = await getUsers(markets.map(m => m.creator_id))
const creatorMap = new Map(creators.map(c => [c.id, c]))
markets.forEach(m => m.creator = creatorMap.get(m.creator_id))
```

### Transaction Pattern

```typescript
const { data, error } = await supabase.rpc('create_market_with_position', {
  market_data: marketData,
  position_data: positionData
})
if (error) throw new Error('Transaction failed')
```

## Caching Strategies

### Cache-Aside with Redis

```typescript
async function getMarketWithCache(id: string): Promise<Market> {
  const cacheKey = `market:${id}`
  const cached = await redis.get(cacheKey)
  if (cached) return JSON.parse(cached)
  const market = await db.markets.findUnique({ where: { id } })
  if (!market) throw new Error('Market not found')
  await redis.setex(cacheKey, 300, JSON.stringify(market))
  return market
}
```

## Error Handling

### Centralized Error Handler

> Continued in [`backend-patterns-2.md`](backend-patterns-2.md)
