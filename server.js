const express = require("express")
const app = express()


app.get("/", (req,res) => {
  res.cookie("lang",req.headers["accept-language"])
  res.sendFile(__dirname + "/src/public/index.html")
})

app.use(express.static("./src/public"))

app.listen(3000, () => console.log("Listening port 3000"))