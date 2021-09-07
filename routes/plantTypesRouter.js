const { Router } = require('express');
const plantTypesRouter = Router();

const {
    getPlantTypes,
    createPlantType,
    getPlantType,
    updatePlantType,
    deletePlantType
} = require('../controllers/plantType.controller')

plantTypesRouter.get('/', getPlantTypes);
plantTypesRouter.get('/:plantTypeId', getPlantType);
plantTypesRouter.put('/edit/:plantTypeId', updatePlantType);
plantTypesRouter.post('/add', createPlantType);
plantTypesRouter.delete('/:plantTypeId', deletePlantType);


module.exports = {
    plantTypesRouter
}