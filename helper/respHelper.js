const successRespHelper = (res, status, message, data = null) => {
    res.status(status).json({
        message,
        status,
        result: 1,
        data,
        error: null
    });
};

const failRespHelper = (res, status, message, error = null) => {
    res.status(status).json({
        message,
        status,
        result: -1,
        data: null,
        error
    });
};

module.exports = {
  successRespHelper,
  failRespHelper
};
