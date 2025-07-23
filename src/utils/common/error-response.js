function ErrorResponse(message, data, error) {
    return {
        success: false,
        message: message || 'Something went wrong',
        data: data || {},
        error: error || {},
    };
}

module.exports = ErrorResponse;
