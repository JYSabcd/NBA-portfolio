import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import compareplayer from './compareplayer'
import home from './home'
const app = new Hono()
app.use('*', cors())

app.get('/', (c) => c.text('Hello Hono!'))

app.route('/compareplayer', compareplayer)
app.route('/home', home)

serve({
    fetch:app.fetch,
    port:3000
})
