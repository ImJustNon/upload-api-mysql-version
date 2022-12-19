var request = require('request');

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