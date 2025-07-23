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
        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse("Request created successfully", airport));
    } catch (error) {
        return res
            .status(error.statusCode)
            .json(ErrorResponse('', {}, error));
    }
}

async function getAllAirport(req, res) {
    try {
        const getAllAirportResponse = await AirportService.getAllAirport();
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse("Request processed successfully", getAllAirportResponse));
    } catch (error) {
        return res
            .status(error.statusCode ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse('', {}, error));
    }
}

async function getAirport(req, res) {
    try {
        const getAllAirportResponse = await AirportService.getAirport(req.params.id);
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse("Request processed successfully", getAllAirportResponse));
    } catch (error) {
        return res
            .status(error.statusCode ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse('', {}, error));
    }
}

async function deleteAirport(req, res) {
    try {
        await AirportService.deleteAirport(req.params.id);
        return res
            .status(StatusCodes.OK)
            .json(SuccessResponse("Successfully deleted the resource", {}));
    } catch (error) {
        return res
            .status(error.statusCode ? error.statusCode : StatusCodes.INTERNAL_SERVER_ERROR)
            .json(ErrorResponse(error.message || '', {}, error));
    }
}

async function updateAirport(req, res) {
    try {
        const airplane = await AirportService.getAirport(req.params.id);
        if (!airplane) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse('Resource not found please provide valid airport id', {}, {}));
        }

        const updateAirportResponse = await AirportService.updateAirport(req.params.id, req.body);
        if (!updateAirportResponse) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse('Not able to update airport data, please try again', {}, {}));
        }

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
    addAirport,
    getAirport,
    getAllAirport,
    deleteAirport,
    updateAirport
}
