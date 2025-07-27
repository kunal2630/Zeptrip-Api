const { StatusCodes } = require('http-status-codes');

const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');
const { DateTimeHelper } = require('../utils/helpers');

function validateAddFlightRequest(req, res, next) {
    const missingFields = [];
    if (!req.body) {
        var error = new AppError(['Request body is required'], StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse('Request body is missing', {}, error));
    }
    if (!req.body.flightNumber) missingFields.push('flightNumber');
    if (!req.body.airplaneId) missingFields.push('airplaneId');
    if (!req.body.departureAirportId) missingFields.push('departureAirportId');
    if (!req.body.arrivalAirportId) missingFields.push('arrivalAirportId');
    if (!req.body.arrivalTime) missingFields.push('arrivalTime');
    if (!req.body.departureTime) missingFields.push('departureTime');
    if (!req.body.price) missingFields.push('price');
    if (!req.body.totalSeats) missingFields.push('totalSeats');
    if (missingFields.length > 0) {
        var error = new AppError(
            [`Missing required field(s): ${missingFields.join(', ')}`],
            StatusCodes.BAD_REQUEST
        );
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse('Something went wrong while adding flight', {}, error));
    }
    if (!DateTimeHelper.isValidDateTime(req.body.arrivalTime)) {
        return res.status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse('Invalid arrivalTime. Expected format: YYYY-MM-DDTHH:mm:ssZ (ISO 8601).', {}));
    }

    if (!DateTimeHelper.isValidDateTime(req.body.departureTime)) {
        return res.status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse('Invalid departureTime. Expected format: YYYY-MM-DDTHH:mm:ssZ (ISO 8601).', {}));
    }


    if (DateTimeHelper.isAfter(req.body.arrivalTime, req.body.departureTime)) {
        return res.status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse('departureTime cannot be later than arrivalTime', {}));
    }
    next();
}

function validateDeleteFlightRequest(req, res, next) {
    if (!req.params.id) {
        ErrorResponse.message = 'Something went wrong while deleting flight schedule';
        ErrorResponse.error = new AppError(['Flight id not found'], StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    next();
}
function validateUpdateFlightRequest(req, res, next) {
    if (!req.params.id) {
        const error = new AppError(['Flight ID not found in request params'], StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse('Something went wrong while updating flight', {}, error));
    }

    const allowedFields = [
        'flightNumber',
        'airplaneId',
        'departureAirportId',
        'arrivalAirportId',
        'arrivalTime',
        'departureTime',
        'price',
        'boardingGate',
        'totalSeats'
    ];

    const hasAtLeastOneField = allowedFields.some(
        field => req.body && req.body[field] !== undefined
    );

    if (!req.body || !hasAtLeastOneField) {
        const error = new AppError(
            ['Provide at least one valid field to update: ' + allowedFields.join(', ')],
            StatusCodes.BAD_REQUEST
        );
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse('At least one field is required to update flight schedule', {}, error));
    }

    next();
}

module.exports = {
    validateAddFlightRequest,
    validateDeleteFlightRequest,
    validateUpdateFlightRequest
}