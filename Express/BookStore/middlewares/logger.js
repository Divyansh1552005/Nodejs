import fs from "fs";

export const loggermiddleware = function (){
    return (req, res, next) => {
        const log = [req.method, req.url, new Date().toISOString()];
        fs.appendFile("requests.log", log.join(" ") + "\n", (err) => {
            if (err) {
                console.error("Error writing to log file:", err);
            }
        });
        next();
    }
}