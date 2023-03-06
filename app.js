const express = require('express')
const path = require('path');
const app = express()

// Define uma rota
app.get('/', async (req, res) =>{
    res.sendFile("./public/index.html", {root: "."});
})

// Inicie o servidor
app.listen(8085, () => {console.log('http://localhost:8085')});
app.use("/js", express.static("./js"));
app.use(express.static('public'));
