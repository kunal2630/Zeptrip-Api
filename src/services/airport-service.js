const { StatusCodes } = require("http-status-codes");
const { AirportRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const airportRepository = new AirportRepository();

async function addAirport(airportData) {
    try {

        const addAirportResponse = await airportRepository.add(airportData);
        return addAirportResponse;
    } catch (error) {
        if (error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot add a new airport', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllAirport() {
    try {
        const getAllAirportResponse = await airportRepository.getAll();
        return getAllAirportResponse;
    } catch (error) {
        throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function getAirport(id) {
    try {
        const getAirportResponse = await airportRepository.get(id);
        return getAirportResponse;
    } catch (error) {
        throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function deleteAirport(id) {

    try {
        const deleteAirportResponse = await airportRepository.delete(id);
        return deleteAirportResponse;
    } catch (error) {
        throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function updateAirport(id, data) {
    try {
        const updateAirportResponse = await airportRepository.update(id, data);
        return updateAirportResponse;
    } catch (error) {
        throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {
    addAirport,
    getAirport,
    getAllAirport,
    deleteAirport,
    updateAirport
}