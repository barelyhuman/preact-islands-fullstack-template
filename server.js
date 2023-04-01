import { renderMiddleware } from '@/lib/render-html'
import bodyParser from 'body-parser'
import cors from 'cors'
import { config as loadConfig } from 'dotenv'
import routes from './server/routes'
import express from 'express'

// Generates the server.css
import '@/styles/global.css'

loadConfig()

const app = express()
const router = express.Router()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Configure according to your application
app.use(cors())

app.use(renderMiddleware)
app.use(routes(router))

app.use('/public', express.static('./dist', { maxAge: 60 * 60 * 1000 }))

app.listen(port, () => console.log(`listening at http://localhost:${port}`))
