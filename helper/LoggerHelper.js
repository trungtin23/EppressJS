const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../log.txt');

const logger = (req, res, next) => {
    const startTime = Date.now();
    const originalSend = res.send;

    res.send = function(data) {
        res.responseBody = data;  
        originalSend.apply(res, arguments);  
    };

    res.on('finish', () => {
        const log = `
[${new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' })}] 
Request: 
- Method: ${req.method} 
- URL: ${req.originalUrl} 
- Headers: ${JSON.stringify(req.headers)} 
- Body: ${JSON.stringify(req.body)} 

Response: 
- Status: ${res.statusCode} 
- Status Message: ${res.statusMessage} 
- Body: ${res.responseBody} 
- Time: ${Date.now() - startTime}ms

-----------------------------------------------
        `;

        fs.appendFile(logFilePath, log, (err) => {
            if (err) {
                console.error('Failed to write log:', err);
            }
        });
    });

    next();
};

module.exports = logger;
