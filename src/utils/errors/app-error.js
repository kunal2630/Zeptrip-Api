class AppError extends Error {

    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.explanation = message;
        this.statusCode = statusCode;
    }
}
module.exports = AppError;