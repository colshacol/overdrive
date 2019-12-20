import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import favicon from "express-favicon"
import path from "path"
import session from "express-session"
import memorystore from "memorystore"
import morgan from "morgan"

import api from "./api"

const { PORT = 8090 } = process.env

const app = express()
const cwd = process.cwd()
const MemoryStore = memorystore(session)

app.use(cors())
app.use(bodyParser.json())
app.use(favicon(path.join(cwd, "favicon.ico")))
app.use(morgan("tiny"))
app.use(express.static(path.join(cwd, "build")))
// app.use(express.static(path.join(cwd, "public")))

app.use(
  session({
    cookie: { maxAge: 86400000 },
    saveUninitialized: false,
    resave: false,
    secret: "keyboard cat",
    store: new MemoryStore({
      checkPeriod: 86400000,
    }),
  })
)

app.get("/ping", (req, res) => {
  return res.send("pong")
})

api(app)

app.listen(PORT, () => {
  console.log(`Listening @ http://localhost:${PORT}`)
})
