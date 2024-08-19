const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../log.txt');

const logger = (req, res, next) => {
    let originalSend = res.send;
    let responseBody = null;

    res.send = function (body) {
        responseBody = body;
        return originalSend.apply(this, arguments);
    };

    res.on('finish', () => {
        const log = `[${new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' })}]` +
                    `${req.method} http://localhost:5000${req.originalUrl}${JSON.stringify(req.body)}\n`+ 
                    `[${new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' })}]` +
                    `${res.statusCode} ${responseBody}\n\n` 
                    ;

        fs.appendFile(logFilePath, log, (err) => {
            if (err) {
                console.error('Failed to write log:', err);
            }
        });
    });

    next();
};

module.exports = logger;
