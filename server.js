const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const urlencoded = bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
});
const path = require('path');


const config = require("./configs/config.js");


app.use(express.json({limit: '50mb'}));
app.use(urlencoded);
app.use(express.static(path.join(__dirname,'./public')));
app.use(express.static(path.join(__dirname,'./node_modules')));

fs.readdirSync("./routers").forEach(async files => {
    let router = require(`./routers/${files}`);
    app.use(router);
    console.log(`[Routes] Loaded : ${files}`);
});

// database setup
fs.readdirSync("./database").forEach(async folders => {
    fs.readdirSync(`./database/${folders}`).forEach(async files => {
        require(`./database/${folders}/${files}`).connect();
        console.log(`[Database] Loaded : ${folders}/${files}`);
    });
});


app.listen(config.app.port, async() =>{
    console.log("[API] App listening on port : " + config.app.port);
});