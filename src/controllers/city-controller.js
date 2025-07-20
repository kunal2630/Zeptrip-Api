const { StatusCodes } = require('http-status-codes');
const { CityService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

async function addCity(req, res) {
    try {

        const city = await CityService.addCity({
            name: req.body.name
        });
        SuccessResponse.message = "Request created successfully";
        SuccessResponse.data = city;
        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res
            .status(error.statusCode ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse);
    }
}

async function getAllCity(req, res) {
    try {
        const getAllCityResponse = await CityService.getAllCity();
        SuccessResponse.message = "Request processed successfully";
        SuccessResponse.data = getAllCityResponse;
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
async function getCity(req, res) {
    try {
        const getAllCityResponse = await CityService.getCity(req.params.id);
        SuccessResponse.message = "Request processed successfully";
        SuccessResponse.data = getAllCityResponse;
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


async function deleteCity(req, res) {
    try {

        await CityService.deleteCity(req.params.id);
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

async function updateCity(req, res) {
    try {

        const city = await CityService.getCity(req.params.id);
        if (!city) {
            ErrorResponse.message = 'Resource not found please provide valid city id'
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
        }
        await CityService.updateCity(req.params.id, req.body);
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
    addCity,
    getCity,
    getAllCity,
    deleteCity,
    updateCity
}