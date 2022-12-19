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

router.post('/api/upload-image', urlencoded, async(req, res) =>{ // รับโพส ข้อมูลภาพที่อัป
    const { file, originalFileName } = await req.body ?? {};

    if(typeof file === "undefined" && typeof originalFileName === "undefined"){ // ถ้าไม่พบคา่ให้รีเทิน กลับ
        console.log(`[API] Request Failed`);
        return res.json({
            status: "FAIL",
            error: "insufficient data",
        });
    }

    const gen_fileName = generate(20); // สุ่มชื่อไฟล์


    await base64Img.img(await file, path.join(__dirname + `\\..\\public\\uploads`), `${gen_fileName}`,async function(err, filepath) { // เเปลง base64 เป็นรูปภาพ
        if(err){ // ถ้ามี error ให้หยุดทำงานเเละส่งค่ากลับทันที
            console.log(`[API] Request Failed`);
            return res.json({
                status: "FAIL",
                error:  "Cannot write file ERROR : " + err,
            });
        }

        const fileFormat = String(filepath).split('.').filter(Boolean).slice(1).join('.'); // หา format ไฟล์
        const link = `http://${config.app.server_ipV4}:${config.app.port}/uploads/${gen_fileName}.${fileFormat}`; // สร้างลิ้ง
        const current_time = new Date().getTime(); // เวลาที่ส่ง request
        try { 
            await query({ // บันทึกข้อมูลลง database
                sql: `INSERT INTO upload (filename,filetype,link,create_at) VALUES ('${gen_fileName}','${fileFormat}','${link}','${String(current_time)}')`,
            }).then(() =>{ 
                // หากไม่มี error ให้ส่งค่ากลับ
                console.log(`[API] Save File ${gen_fileName}.${fileFormat} Success from : ${get_ip(req)}`);
                return res.json({
                    status: "SUCCESS",
                    error: null,
                    link: `http://${config.app.server_ipV4}:${config.app.port}/api/call?image=${gen_fileName}`,
                    filename: `${gen_fileName}`,
                    filetype: `${fileFormat}`,
                    create_at: `${current_time}`,
                });    
            });
        } catch(err) { //หากพบ error ให้ส่งกลับทันที
            return res.json({
                status: "FAIL",
                error:  "Cannt INSERT INTO database : " + err,
            });
        }
    });
});

module.exports = router;


// 👇 ขยะ

//======================================================================= Trash =====================================================================

/*
    res.json({
        status: "SUCCESS",
        path: "http://127.0.0.1:8800/upload/",
        filename: "lnwza",
    })
*/

    /*
    if(typeof data !== "undefined" && typeof filename !== "undefined" && typeof path !== "undefined"){ // ต้องมีค่าทั้งหมด
        let FILE_NAME = generate(20); // สุ่มชื่อไฟล์

        fs.writeFile(__dirname + `\\..\\public\\upload\\${path}\\${FILE_NAME}.txt`, data, { // เขียนไฟล์
            encoding: "utf8",
        },async(err) =>{
            if(!err){
                await query({
                    sql: `INSERT INTO file(filename,filepath,link) VALUES('${FILE_NAME}','${__dirname + `\\..\\public\\upload\\${path}\\${FILE_NAME}.txt`}','http://127.0.0.1:8800/upload/${path}/${FILE_NAME}.txt')`
                }).then(() =>{
                    res.json({
                        status: "SUCCESS",
                        link: `http://127.0.0.1:8800/upload/${path}/${FILE_NAME}.txt`,
                        filename: `${FILE_NAME}`,
                    });
                    console.log(`[API] Save File ${FILE_NAME}.txt Success from : ${get_ip(req)}`);
                });
            }
            else {
                res.json({
                    status: "FAIL",
                    error: err,
                });
                console.log(`[API] Request Failed`);
            }
        });
    }
    else {
        res.json({
            status: "FAIL",
            error: "insufficient data",
        });
        console.log(`[API] Request Failed`);
    }
    */





    // const base64Data = await file.replace(/^data:image\/png;base64,/, "");

    // fs.writeFile(__dirname + `\\..\\public\\uploads\\${gen_fileName}.png`, await base64Data, 'base64', async(err) =>{})
        /*if(err){
            console.log(`[API] Request Failed`);
            return res.json({
                status: "FAIL",
                error:  "Cannot write file ERROR : " + err,
            });
        }

        const fileFormat = "png";
        const link = `http://127.0.0.1:${String(config.app.port)}/public/uploads/${gen_fileName}.${fileFormat}`;
        const current_date = new Date().getTime();

        await query({
            sql: `INSERT INTO file(filename,fileFormat,link,create_at) VALUES('${gen_fileName}','${fileFormat}','${link}','${current_date}')`,
        }).then(() =>{
            res.json({
                status: "SUCCESS",
                link: `http://127.0.0.1:8800/upload/${gen_fileName}.${fileFormat}`,
                filename: `${gen_fileName}`,
                fileFormat: `${fileFormat}`,
            });
            console.log(`[API] Save File ${gen_fileName}.png Success from : ${get_ip(req)}`);
        });
    });*/