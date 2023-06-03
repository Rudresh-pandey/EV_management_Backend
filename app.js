const express = require("express");


const app = express();


app.get("/", (req, res) => {
    res.send("home")
})

app.listen(3000, () => {
    console.log("on port 3000")
})