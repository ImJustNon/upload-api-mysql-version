//Anti Error
module.exports = async () =>{
    process.on('unhandledRejection', async(reason, p) =>{
        console.log("[Anti-crash] " + "Unhandled Rejection/Catch");
        console.log(reason, p);
    });

    process.on('uncaughtException', async(err, origin) =>{
        console.log("[Anti-crash] " + "Uncaught Exception/Catch");
        console.log(err, origin);
    });

    process.on('uncaughtExceptionMonitor', async(err, origin) =>{
        console.log("[Anti-crash] " + "Uncaught Exception/Catch (MONITOR)");
        console.log(err, origin);
    });
}