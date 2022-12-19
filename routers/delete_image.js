const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencoded = bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
});
const fs = require('fs');
const { query } = require("../database/postgresSQL/connect.js");
const { get_ip } = require("../utils/get_ip.js");
const path = require("path");

router.post('/api/delete-image', urlencoded, async(req, res) =>{ // รับโพส ข้อมูลภาพที่ต้องการจะลบ
    const { filename } = await req.body ?? {};

    if(typeof filename === "undefined"){
        console.log("[API] Request Failed ERROR : Please specify a filename"); 
        return res.json({
            status: 'FAIL',
            error: 'Please specify a filename',
        });
    }

    const search_file = await query({
        sql: `SELECT * FROM upload WHERE filename='${filename}'`,
    });
    // เช็ค ถ้าไม่พบชื่อไฟล์นี้ใน database ให้รีเทินค่ากลับ
    if(search_file.result.rows.length === 0){
        console.log(`[API] Request Failed ERROR : file name : ${filename} not found`);
        return res.json({
            status: 'FAIL',
            error: `file name : ${filename} not found`,
        });
    }

    fs.unlink(path.join(__dirname + `\\..\\public\\uploads`) + `\\${search_file.result.rows[0].filename}.${search_file.result.rows[0].filetype}`, async(err) =>{
        if(err){
            console.log(`[API] Cannot delete file ERROR : ${err}`);
            return res.json({
                status: 'FAIL',
                error: `Cannot delete file ERROR : ${err}`,
            });
        }
        try {
            await query({
                sql: `DELETE FROM upload WHERE filename='${search_file.result.rows[0].filename}'`,
            }).then(() =>{
                console.log(`[API] Delete Success from : ${get_ip(req)}`);
                return res.json({
                    status: 'SUCCESS',
                    error: null,
                });
            });
        } catch(err) {
            console.log(`[API] DELETE data in database Failed ERROR : ${err}`);
            return res.json({
                status: 'FAIL',
                error: `DELETE data in database Failed ERROR : ${err}`,
            });
        }
    });
});

module.exports = router;
/*
if(!validFilename.error){
    if(validFilename.result.rows.length > 0){
        fs.unlink(validFilename.result.rows[0].filepath, async(err) =>{
            if(!err){
                await query({
                    sql: `DELETE FROM path WHERE filename='${fileName}'`,
                }).then(() =>{
                    res.json({
                        status: 'SUCCESS',
                    });
                    console.log(`[API] Delete File ${fileName}.txt Success from : ${get_ip(req)}`);
                });
            }
            else {
                res.json({
                    status: 'FAIL',
                    error: 'Please try again later or file not found',
                });
                console.log("[API] Request Failed");
            }
        });
    }
    else {
        res.json({
            status: 'FAIL',
            error: 'Please try again later or file not found',
        });
        console.log("[API] Request Failed");
    }
}
else {
            res.json({
                status: 'FAIL',
                error: validFilename.error,
            });
            console.log("[API] Request Failed");
        }
*/