module.exports = {
    get_ip: (req) =>{
        let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        return ip;
    },
}