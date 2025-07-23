const { StatusCodes } = require('http-status-codes');
const { FlightService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

async function addFlight(req, res) {
    try {

        const airplane = await FlightService.addFlight({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        });
        SuccessResponse.message = "Request created successfully";
        SuccessResponse.data = airplane;
        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode)
            .json(ErrorResponse);
    }
}

async function getAllFlight(req, res) {
    try {
        const getAllFlightResponse = await FlightService.getAllFlight();
        SuccessResponse.message = "Request processed successfully";
        SuccessResponse.data = getAllFlightResponse;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);
    }

}
async function getFlight(req, res) {
    try {
        const getAllFlightResponse = await FlightService.getFlight(req.params.id);
        SuccessResponse.message = "Request processed successfully";
        SuccessResponse.data = getAllFlightResponse;
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);
    }
}


async function deleteFlight(req, res) {
    try {

        await FlightService.deleteFlight(req.params.id);
        SuccessResponse.message = "Successfully deleted the resource"
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        if (error.message) ErrorResponse.message = error.message
        return res
            .status(error.statusCode ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);
    }
}

async function updateFlight(req, res) {
    try {

        const airplane = await FlightService.getFlight(req.params.id);
        if (!airplane) {
            ErrorResponse.message = 'Resource not found please provide valid flight id'
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
        }
        await FlightService.updateFlight(req.params.id, req.body);
        SuccessResponse.message = 'Successfully updated the resource'
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        if (error.message) ErrorResponse.message = error.message
        return res
            .status(error.statusCode ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);
    }
}

module.exports = {
    addFlight,
    getFlight,
    getAllFlight,
    deleteFlight,
    updateFlight
}