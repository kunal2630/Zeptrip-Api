const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateAddAirportRequest(req, res, next) {
    if (!req.body || !req.body.name) {
        ErrorResponse.message = 'Something went wrong while adding airport';
        ErrorResponse.error = new AppError(['name not found in the provided request, please check request body'], StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)``
            .json(ErrorResponse);
    }
    if (!req.body.code) {
        ErrorResponse.message = 'Something went wrong while adding airport';
        ErrorResponse.error = new AppError(['code not found in the provided request, please check request body'], StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    if (!req.body.cityId) {
        ErrorResponse.message = 'Something went wrong while adding airport';
        ErrorResponse.error = new AppError(['cityId not found in the provided request,please check request body'], StatusCodes.BAD_REQUEST);
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