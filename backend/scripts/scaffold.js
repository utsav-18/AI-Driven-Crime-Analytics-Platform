const fs = require('fs');
const path = require('path');

const entities = [
    { name: 'cases', singular: 'case', table: 'case_master' },
    { name: 'victims', singular: 'victim', table: 'victims' },
    { name: 'accused', singular: 'accused', table: 'accused' },
    { name: 'districts', singular: 'district', table: 'districts' },
    { name: 'units', singular: 'unit', table: 'units' },
    { name: 'crimeCategories', singular: 'crimeCategory', table: 'crime_heads' }, // Adjust later
    { name: 'acts', singular: 'act', table: 'acts' },
    { name: 'sections', singular: 'section', table: 'sections' },
    { name: 'courts', singular: 'court', table: 'courts' },
    { name: 'employees', singular: 'employee', table: 'employees' }
];

const dirs = ['repositories', 'services', 'controllers', 'validations', 'routes'];

dirs.forEach(dir => {
    const dirPath = path.join(__dirname, '..', 'src', dir);
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
});

entities.forEach(entity => {
    const CapName = entity.name.charAt(0).toUpperCase() + entity.name.slice(1);
    const SingCap = entity.singular.charAt(0).toUpperCase() + entity.singular.slice(1);

    // 1. Repository
    const repoContent = `const db = require('../config/db');

class ${CapName}Repository {
    async findAll() {
        const result = await db.query('SELECT * FROM ${entity.table}');
        return result.rows;
    }

    async findById(id) {
        const result = await db.query('SELECT * FROM ${entity.table} WHERE id = $1', [id]);
        return result.rows[0];
    }

    async create(data) {
        // Placeholder implementation
        return { id: 1, ...data };
    }

    async update(id, data) {
        // Placeholder implementation
        return { id, ...data };
    }

    async delete(id) {
        // Placeholder implementation
        return { id };
    }
}

module.exports = new ${CapName}Repository();
`;
    fs.writeFileSync(path.join(__dirname, '..', 'src', 'repositories', `${entity.name}.repository.js`), repoContent);

    // 2. Service
    const serviceContent = `const ${entity.name}Repository = require('../repositories/${entity.name}.repository');

class ${CapName}Service {
    async getAll${CapName}() {
        return await ${entity.name}Repository.findAll();
    }

    async get${SingCap}ById(id) {
        return await ${entity.name}Repository.findById(id);
    }

    async create${SingCap}(data) {
        return await ${entity.name}Repository.create(data);
    }

    async update${SingCap}(id, data) {
        return await ${entity.name}Repository.update(id, data);
    }

    async delete${SingCap}(id) {
        return await ${entity.name}Repository.delete(id);
    }
}

module.exports = new ${CapName}Service();
`;
    fs.writeFileSync(path.join(__dirname, '..', 'src', 'services', `${entity.name}.service.js`), serviceContent);

    // 3. Controller
    const controllerContent = `const ${entity.name}Service = require('../services/${entity.name}.service');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

class ${CapName}Controller {
    getAll = asyncHandler(async (req, res) => {
        const data = await ${entity.name}Service.getAll${CapName}();
        res.status(200).json(new ApiResponse(200, data, "${CapName} retrieved successfully"));
    });

    getById = asyncHandler(async (req, res) => {
        const data = await ${entity.name}Service.get${SingCap}ById(req.params.id);
        if (!data) throw new ApiError(404, "${SingCap} not found");
        res.status(200).json(new ApiResponse(200, data, "${SingCap} retrieved successfully"));
    });

    create = asyncHandler(async (req, res) => {
        const data = await ${entity.name}Service.create${SingCap}(req.body);
        res.status(201).json(new ApiResponse(201, data, "${SingCap} created successfully"));
    });

    update = asyncHandler(async (req, res) => {
        const data = await ${entity.name}Service.update${SingCap}(req.params.id, req.body);
        res.status(200).json(new ApiResponse(200, data, "${SingCap} updated successfully"));
    });

    delete = asyncHandler(async (req, res) => {
        await ${entity.name}Service.delete${SingCap}(req.params.id);
        res.status(200).json(new ApiResponse(200, null, "${SingCap} deleted successfully"));
    });
}

module.exports = new ${CapName}Controller();
`;
    fs.writeFileSync(path.join(__dirname, '..', 'src', 'controllers', `${entity.name}.controller.js`), controllerContent);

    // 4. Validation
    const validationContent = `// ${CapName} validation schemas
// Real implementation would use Joi/Zod

const createSchema = {
    body: (data) => {
        // return { error: "Validation failed message" } if invalid
        return { value: data }; 
    }
};

const updateSchema = {
    body: (data) => {
        return { value: data };
    }
};

module.exports = {
    createSchema,
    updateSchema
};
`;
    fs.writeFileSync(path.join(__dirname, '..', 'src', 'validations', `${entity.singular}.validation.js`), validationContent);

    // 5. Routes
    const routeContent = `const express = require('express');
const router = express.Router();
const ${entity.name}Controller = require('../controllers/${entity.name}.controller');
const validate = require('../middleware/validate');
const ${entity.singular}Validation = require('../validations/${entity.singular}.validation');

router.get('/', ${entity.name}Controller.getAll);
router.get('/:id', ${entity.name}Controller.getById);
router.post('/', validate(${entity.singular}Validation.createSchema), ${entity.name}Controller.create);
router.put('/:id', validate(${entity.singular}Validation.updateSchema), ${entity.name}Controller.update);
router.delete('/:id', ${entity.name}Controller.delete);

module.exports = router;
`;
    fs.writeFileSync(path.join(__dirname, '..', 'src', 'routes', `${entity.name}.routes.js`), routeContent);

});

console.log("Scaffolding completed.");
