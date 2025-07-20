const { StatusCodes } = require('http-status-codes');

const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateAddAirplaneRequest(req, res, next) {
    if (!req.body || !req.body.modelNumber) {
        ErrorResponse.message = 'Something went wrong while adding airplane';
        ErrorResponse.error = new AppError(['Model Number not found'], StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    next();
}

function validateDeleteAirplaneRequest(req, res, next) {

    if (!req.params.id) {
        ErrorResponse.message = 'Something went wrong while deleting airplane';
        ErrorResponse.error = new AppError(['Airplane id not found'], StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    next();
}
function validateUpdateAirplaneRequest(req, res, next) {

    if (!req.params.id) {
        ErrorResponse.message = 'Something went wrong while deleting airplane';
        ErrorResponse.error = new AppError(['Airplane id not found'], StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    if (!req.body || (!req.body.modelNumber && !req.body.capacity)) {
        ErrorResponse.message = 'Atleast ModelNumber or Capacity is required for updating resource';
        ErrorResponse.error = new AppError(['Something went wrong while updating airplane'], StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    next();
}
module.exports = {
    validateAddAirplaneRequest,
    validateDeleteAirplaneRequest,
    validateUpdateAirplaneRequest
}