const { StatusCodes } = require('http-status-codes');
const { FlightService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

async function addFlight(req, res) {
    try {
        const airplane = await FlightService.addFlight({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        });
        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse("Request created successfully", airplane));
    } catch (error) {
        return res
            .status(error.statusCode)
            .json(ErrorResponse('', {}, error));
    }
}

async function getAllFlight(req, res) {
    try {
        const getAllFlightResponse = await FlightService.getAllFlight();
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse("Request processed successfully", getAllFlightResponse));
    } catch (error) {
        return res
            .status(error.statusCode ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse('', {}, error));
    }
}

async function getFlight(req, res) {
    try {
        const getAllFlightResponse = await FlightService.getFlight(req.params.id);
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse("Request processed successfully", getAllFlightResponse));
    } catch (error) {
        return res
            .status(error.statusCode ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse('', {}, error));
    }
}

async function deleteFlight(req, res) {
    try {
        await FlightService.deleteFlight(req.params.id);
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse("Successfully deleted the resource", {}));
    } catch (error) {
        return res
            .status(error.statusCode ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse(error.message || '', {}, error));
    }
}

async function updateFlight(req, res) {
    try {
        const airplane = await FlightService.getFlight(req.params.id);
        if (!airplane) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse('Resource not found please provide valid flight id', {}, {}));
        }
        await FlightService.updateFlight(req.params.id, req.body);
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse('Successfully updated the resource', {}));
    } catch (error) {
        return res
            .status(error.statusCode ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse(error.message || '', {}, error));
    }
}

module.exports = {
    addFlight,
    getFlight,
    getAllFlight,
    deleteFlight,
    updateFlight
}