const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencoded = bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
});
const fs = require('fs');
const { query } = require("../database/postgresSQL/connect.js");
const { generate } = require("../utils/generate_filename.js");
const { get_ip } = require("../utils/get_ip.js");
const config = require("../configs/config.js");
const base64Img = require('base64-img');
const path = require('path');

router.get('/', urlencoded, async(req, res) =>{ // รับโพส ข้อมูลภาพที่อัป
    res.json({
        status: "ONLINE",
        error: null,
    });
});


module.exports = router;