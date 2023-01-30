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

router.get('/api/call', urlencoded, async(req, res) =>{ // รับโพส ข้อมูลภาพที่อัป
    const { image } = req.query ?? {};

    if(typeof image === "undefined"){
        return res.json({
            status: "FAIL",
            error: `Please specify image name`,
        });
    }

    const image_data = await query({
        sql: `SELECT * FROM upload WHERE filename='${image}'`,
    });

    if(image_data.result.rows.length === 0){
        return res.json({
            status: "FAIL",
            error: `Cant get data from this name`,
        });
    }

    console.log(`[API] GET ${image_data.result.rows[0].filename}.${image_data.result.rows[0].filetype} From : ${await get_ip(req)}`);
    return res.sendFile(path.join(__dirname + `/../public/uploads/${image_data.result.rows[0].filename}.${image_data.result.rows[0].filetype}`)); // `http://${config.app.server_ipV4}:${config.app.port}/uploads/${image_data.result.rows[0].filename}.${image_data.result.rows[0].filetype}`
});

module.exports = router;
