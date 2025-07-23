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
        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse('Request created successfully', airplane));
    } catch (error) {
        return res
            .status(error.statusCode)
            .json(ErrorResponse('', {}, error));
    }
}

async function getAllAirplane(req, res) {
    try {
        const getAllAirplaneResponse = await AirplaneService.getAllAirplane();
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse('Request processed successfully', getAllAirplaneResponse));
    } catch (error) {
        return res
            .status(error.statusCode ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse('', {}, error));
    }
}

async function getAirplane(req, res) {
    try {
        const getAllAirplaneResponse = await AirplaneService.getAirplane(req.params.id);
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse('Request processed successfully', getAllAirplaneResponse));
    } catch (error) {
        return res
            .status(error.statusCode ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse('', {}, error));
    }
}

async function deleteAirplane(req, res) {
    try {
        await AirplaneService.deleteAirplane(req.params.id);
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse('Successfully deleted the resource', {}));
    } catch (error) {
        return res
            .status(error.statusCode ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse(error.message || '', {}, error));
    }
}

async function updateAirplane(req, res) {
    try {
        const airplane = await AirplaneService.getAirplane(req.params.id);
        if (!airplane) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse('Resource not found please provide valid airplane id', {}, {}));
        }
        await AirplaneService.updateAirplane(req.params.id, req.body);
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
    addAirplane,
    getAirplane,
    getAllAirplane,
    deleteAirplane,
    updateAirplane
}
