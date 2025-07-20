const { StatusCodes } = require('http-status-codes');
const { AirplaneService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const { AirplaneRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');

async function addAirplane(req, res) {
    try {

        const airplane = await AirplaneService.addAirplane({
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

async function getAllAirplane(req, res) {
    try {
        const getAllAirplaneResponse = await AirplaneService.getAllAirplane();
        SuccessResponse.message = "Request processed successfully";
        SuccessResponse.data = getAllAirplaneResponse;
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
async function getAirplane(req, res) {
    try {
        const getAllAirplaneResponse = await AirplaneService.getAirplane(req.params.id);
        SuccessResponse.message = "Request processed successfully";
        SuccessResponse.data = getAllAirplaneResponse;
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


async function deleteAirplane(req, res) {
    try {

        await AirplaneService.deleteAirplane(req.params.id);
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

async function updateAirplane(req, res) {
    try {

        const airplane = await AirplaneService.getAirplane(req.params.id);
        if (!airplane) {
            ErrorResponse.message = 'Resource not found please provide valid airplane id'
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
        }
        await AirplaneService.updateAirplane(req.params.id, req.body);
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
    addAirplane,
    getAirplane,
    getAllAirplane,
    deleteAirplane,
    updateAirplane
}