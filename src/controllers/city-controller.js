const { StatusCodes } = require('http-status-codes');
const { CityService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

async function addCity(req, res) {
    try {
        const city = await CityService.addCity({
            name: req.body.name
        });
        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse('Request created successfully', {}));
    } catch (error) {
        return res
            .status(error.statusCode ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse('', {}, error));
    }
}

async function getAllCity(req, res) {
    try {
        const getAllCityResponse = await CityService.getAllCity();
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse("Request processed successfully", getAllCityResponse));
    } catch (error) {
        return res
            .status(error.statusCode ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse('', {}, error));
    }
}

async function getCity(req, res) {
    try {
        const getAllCityResponse = await CityService.getCity(req.params.id);
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse("Request processed successfully", getAllCityResponse));
    } catch (error) {
        return res
            .status(error.statusCode ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse('', {}, error));
    }
}

async function deleteCity(req, res) {
    try {
        const deleteCityResponse = await CityService.deleteCity(req.params.id);
        if (!deleteCityResponse) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json(ErrorResponse("Resource not found", {}, {}));
        }
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse("Successfully deleted the resource", {}));
    } catch (error) {
        return res
            .status(error.statusCode ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse(error.message || '', {}, error));
    }
}

async function updateCity(req, res) {
    try {
        const city = await CityService.getCity(req.params.id);
        if (!city) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse('Resource not found please provide valid city id', {}, {}));
        }
        await CityService.updateCity(req.params.id, req.body);
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
    addCity,
    getCity,
    getAllCity,
    deleteCity,
    updateCity
}
