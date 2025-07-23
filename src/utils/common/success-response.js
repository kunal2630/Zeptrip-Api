function SuccessResponse(message, data, error) {
    return {
        success: true,
        message: message || 'Something went wrong',
        data: data || {},
        error: error || {},
    };
}
module.exports = SuccessResponse;
