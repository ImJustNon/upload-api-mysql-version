const fs = require('fs');
var request = require('request');

(async () => {
    const data = await fs.readFileSync('../test/base64_image.txt', {
        encoding: 'utf8', 
    });

    const options = {
        uri: 'http://127.0.0.1:8800/api/upload-image',
        method: 'POST',
        json: {
            "file": `${data}`,
            "originalFileName": `adasdasdasd.png`
        }
    }

    request(options, (error, response, body) =>{
        if(error){
            console.log(error);
        }
        console.log(response.body)
    });
})();