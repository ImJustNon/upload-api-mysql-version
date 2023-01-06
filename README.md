<center><h1>HOW TO USE</h1></center>

<center><h3>ตั้งค่า Database</h3></center>

- Table name

```asciidoc
Name             :: upload
```
- Column 1
```asciidoc
Name             :: filename
Data type        :: character varying
Length/Precision :: 255
Not NULL         :: true
Primary key      :: true
```
- Column 2
```asciidoc
Name             :: link
Data type        :: character varying
Length/Precision :: 255
Not NULL         :: false
Primary key      :: false
```
- Column 3
```asciidoc
Name             :: create_at
Data type        :: character varying
Length/Precision :: 255
Not NULL         :: true
Primary key      :: false
```
- Column 4
```asciidoc
Name             :: filetype
Data type        :: character varying
Length/Precision :: 255
Not NULL         :: false
Primary key      :: false
```

<center><h3>วิธีใช้</h3></center>

1) ถ้ายังไม่ได้ลง yarn ใช้คำสั่ง `npm install --global yarn` ก่อน
2) ถ้ามีเเล้ว ใช้คำสั่ง `yarn install`
3) ไปที่ `\configs\config.js` เเก้ config ในนี้
4) คำสั่ง start สามารถใช้ -nodemon `yarn dev` หรือ -node `yarn start` ได้เลย
5) upload ใช้ 
```js
const fs = require('fs'); // ใช้ fs
const request = require('request'); //ใช้ request

(async () => {
    const data = await fs.readFileSync('../test/base64_image.txt', { // เลือกเเหล่งของข้อมูล
        encoding: 'utf8',
    });

    const options = {
        uri: 'http://127.0.0.1:8800/api/upload-image', // url api
        method: 'POST',
        json: {
            "file": `${data}`, // ข้อมูล base64
            "originalFileName": `adasdasdasd.png` //ชื่อ ไฟล์ดั่งเดิม
        }
    }

    request(options, (error, response, body) =>{ // สั่ง request ไปที่ server
        if(error){ 
            console.log(error);
        }
        console.log(response.body); // เเสดงการตอบกลับ
    });
})();
```
6) ร้องขอข้อมูล ใช้ 
```asciidoc
เเบบ 1 :: http://127.0.0.1:8800/api/call?image=[ขื่อภาพ]
                                หรือ
เเบบ 2 :: http://127.0.0.1:8800/uploads/[ชื่อภาพ เเละ formatของถาพเช่น .png .jpg .jpeg]
```
7) ลบข้อมูล 
```js
const request = require('request');

(async () => {
    const options = {
        uri: 'http://127.0.0.1:8800/api/delete-image',
        method: 'POST',
        json: {
            "filename" : "Xvsa8kNCkrHn8fJYRJ3i" // ชื่อไฟล์ที่ต้องการจะลบ
        }
    }

    request(options, function (error, response, body) {
        if(error){
            console.log(error);
        }
        console.log(response.body)
    });
})();
```