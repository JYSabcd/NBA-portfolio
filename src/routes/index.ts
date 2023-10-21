import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import compareplayer from './compareplayer'
const app = new Hono()
app.use('*', cors())

app.get('/', (c) => c.text('Hello Hono!'))

app.route('/compareplayer', compareplayer)

serve({
    fetch:app.fetch,
    port:3000
})
