const { StatusCodes } = require("http-status-codes");
const { AirplaneRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const airplaneRepository = new AirplaneRepository();

async function addAirplane(airplaneData) {
    try {

        const addAirplaneResponse = await airplaneRepository.add(airplaneData);
        return addAirplaneResponse;
    } catch (error) {
        if (error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Airplance object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllAirplane() {
    try {
        const getAllAirplaneResponse = await airplaneRepository.getAll();
        return getAllAirplaneResponse;
    } catch (error) {
        throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function getAirplane(id) {
    try {
        const getAirplaneResponse = await airplaneRepository.get(id);
        return getAirplaneResponse;
    } catch (error) {
        throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function deleteAirplane(id) {

    try {
        const deleteAirplaneResponse = await airplaneRepository.delete(id);
        if (!deleteAirplaneResponse) {
            throw new Error("Resource Not Found");
        }
        return deleteAirplaneResponse;
    } catch (error) {
        throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function updateAirplane(id, data) {
    try {
        const updateAirplaneResponse = await airplaneRepository.update(id, data);
        return updateAirplaneResponse;
    } catch (error) {
        throw new AppError(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {
    addAirplane,
    getAirplane,
    getAllAirplane,
    deleteAirplane,
    updateAirplane
}