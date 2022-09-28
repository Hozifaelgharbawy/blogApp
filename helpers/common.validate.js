module.exports = (schema) => {
    return (req, res, next) => {
        let validationResult = schema.body.validate(req.body);
        var validation = [];
        if(validationResult.error){
            validation.push(validationResult.error.details[0].message)
        }
        if(validation.length){
            res.status(400).json({message: validation.join()});
            return;
        }
        next();
    }
}