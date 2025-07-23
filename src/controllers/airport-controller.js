const { StatusCodes } = require('http-status-codes');
const { AirportService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

async function addAirport(req, res) {
    try {

        const airport = await AirportService.addAirport({
            name: req.body.name,
            address: req.body.address,
            code: req.body.code,
            cityId: req.body.cityId
        });
        SuccessResponse.message = "Request created successfully";
        SuccessResponse.data = airport;
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

async function getAllAirport(req, res) {
    try {
        const getAllAirportResponse = await AirportService.getAllAirport();
        SuccessResponse.message = "Request processed successfully";
        SuccessResponse.data = getAllAirportResponse;
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
async function getAirport(req, res) {
    try {
        const getAllAirportResponse = await AirportService.getAirport(req.params.id);
        SuccessResponse.message = "Request processed successfully";
        SuccessResponse.data = getAllAirportResponse;
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


async function deleteAirport(req, res) {
    try {

        await AirportService.deleteAirport(req.params.id);
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

async function updateAirport(req, res) {
    try {

        const airplane = await AirportService.getAirport(req.params.id);
        if (!airplane) {
            ErrorResponse.message = 'Resource not found please provide valid airport id'
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
        }
        const updateAirportResponse = await AirportService.updateAirport(req.params.id, req.body);
        if (!updateAirportResponse) {
            ErrorResponse.message = 'Not able to update airport data, please try again'
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
        }
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
    addAirport,
    getAirport,
    getAllAirport,
    deleteAirport,
    updateAirport
}