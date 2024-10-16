const errorHandler = (error, req, res, next) => {
    console.log(error.stack);
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    res.status(statusCode).json({
        status: "error",
        statusCode,
        message
    });
}

module.exports = errorHandler;