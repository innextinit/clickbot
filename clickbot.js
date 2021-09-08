require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const puppeteer = require('puppeteer')
//const openvpnmanager = require('node-openvpn')

const router = express.Router()
const app = express()
const { PORT, vpnUserName, vpnPassword } = process.env
// const options = {
//   host: '127.0.0.1',
//   port: 1337,
//   timeout: 1500
// }
// const auth = {
//   user: vpnPassword,
//   pass: vpnPassword
// }

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use("/", router)

router.get("/", (req, res) => {
  res.sendFile("./index.html", { root: __dirname})
})

router.post("/", async (req, res) => {
  const url = req.body.url
  const numberOfClick = req.body.numberOfClick
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
  //const openvpn = openvpnmanager.connect(options)
  console.log(url, numberOfClick)

  for (let click = 0; click < numberOfClick; click++) {
    const page = await browser.newPage()
    await page.goto(url, {waitUntil: "load"})
    await page.close()
    console.log(click)
  }

  res.json(`you made ${numberOfClick} clicks to ${url}`)
})

app.listen(PORT, async () => {
    console.log(`::> Server listening on port ${ PORT }`)
})

module.exports = app