const ApiError = require("../utils/ApiError");

const validate = (schema) => (req, res, next) => {
    // Basic structural validation mechanism. Real implementation would use Joi/Zod
    // Here we'll pass the request objects to the schema validator functions.
    try {
        if (schema.body) {
            const { error } = schema.body(req.body);
            if (error) throw new ApiError(400, error);
        }
        if (schema.query) {
            const { error } = schema.query(req.query);
            if (error) throw new ApiError(400, error);
        }
        if (schema.params) {
            const { error } = schema.params(req.params);
            if (error) throw new ApiError(400, error);
        }
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = validate;
