require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const puppeteer = require('puppeteer')

const router = express.Router()
const app = express()
const { PORT } = process.env

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use("/", router)

router.get("/", (req, res) => {
  res.sendFile("./index.html", { root: __dirname})
})

router.post("/", async (req, res) => {
  const url = req.body.url
  const numberOfClick = req.body.numberOfClick
  const browser = await puppeteer.launch()
    
  console.log(url, numberOfClick)
  for (let click = 0; click < numberOfClick; click++) {
    const page = await browser.newPage()
    await page.goto(url, {waitUntil: "domcontentloaded"})
    console.log(`this is the ${click} to the url ${url}`)
  }

  await browser.close()
  res.json(`you made ${numberOfClick}'s to ${url}`)
})

app.listen(PORT, async () => {
    console.log(`::> Server listening on port ${ PORT }`)
})

module.exports = app