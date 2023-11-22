import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.text('Yo!'))
app.get('/health', (c) => c.text('OK'))

export default app
