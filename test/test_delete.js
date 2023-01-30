
const fs = require('fs');
var request = require('request');

(async () => {
    // const data = await fs.readFileSync('./base64_image.txt', { encoding: 'utf8' });


    /*await request.get('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOSfd_uzUAN3NnJTu75se4cZIveGhmxoZUUg&usqp=CAU',async function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let data = "data:" + "image/png" + ";base64," + Buffer.from(body).toString('base64');
        
            
        }
    });*/


    /*await request.post({
        url: 'http://127.0.0.1:8800/upload-image',
        headers: {
            'content-type' : 'application/x-www-form-urlencoded'
        },
        body : `file=${await data}`
    }, async(err, res, body) =>{
        // const { status } = JSON.parse(await res.body) ?? {}; 
        // console.log(JSON.parse(await res.body));
        console.log(err)
    });*/


    /*await request.get(`http://127.0.0.1:8800/upload-image?image=${data}`,async function (error, response, body) {
        console.log(response);
    });*/
        

    const options = {
        uri: 'http://127.0.0.1:8800/api/delete-image',
        method: 'POST',
        json: {
            "filename" : "E7uYcBSP97HV07h0kkD1"
        }
    }

    request(options, function (error, response, body) {
        if(error){
            console.log(error);
        }
        console.log(response.body)
    });
})();