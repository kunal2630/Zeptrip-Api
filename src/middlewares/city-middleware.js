const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateAddCityRequest(req, res, next) {
    if (!req.body || !req.body.name) {
        ErrorResponse.message = 'Something went wrong while adding city';
        ErrorResponse.error = new AppError(['City name not found'], StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    next();
}

function validateDeleteCityRequest(req, res, next) {

    if (!req.params.id) {
        ErrorResponse.message = 'Something went wrong while deleting city';
        ErrorResponse.error = new AppError(['City id not found'], StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    next();
}
function validateUpdateCityRequest(req, res, next) {

    if (!req.params.id) {
        ErrorResponse.message = 'Something went wrong while deleting city';
        ErrorResponse.error = new AppError(['City id not found'], StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    if (!req.body || !req.body.name) {
        ErrorResponse.message = 'Atleast ModelNumber or Capacity is required for updating resource';
        ErrorResponse.error = new AppError(['Something went wrong while updating city'], StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    next();
}
module.exports = {
    validateAddCityRequest,
    validateDeleteCityRequest,
    validateUpdateCityRequest
}