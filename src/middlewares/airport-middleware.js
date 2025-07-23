const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateAddAirportRequest(req, res, next) {
    if (!req.body || !req.body.name || !req.body.code || !req.body.cityId) {
        ErrorResponse.message = 'Something went wrong while adding airport';
        ErrorResponse.error = new AppError(['Please provide all data to add new airport'], StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    next();
}

function validateDeleteAirportRequest(req, res, next) {

    if (!req.params.id) {
        ErrorResponse.message = 'Something went wrong while deleting airport';
        ErrorResponse.error = new AppError(['Airport id not found'], StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    next();
}
function validateUpdateAirportRequest(req, res, next) {

    if (!req.params.id) {
        ErrorResponse.message = 'Something went wrong while updating airport';
        ErrorResponse.error = new AppError(['Airport id not found'], StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    if (!req.body || (!req.body.name && !req.body.code && !req.body.cityId && !req.body.address)) {
        ErrorResponse.message = 'Please provide some value to update';
        ErrorResponse.error = new AppError(['Something went wrong while updating airport data'], StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    next();
}
module.exports = {
    validateAddAirportRequest,
    validateDeleteAirportRequest,
    validateUpdateAirportRequest
}