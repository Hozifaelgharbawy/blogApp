let joi = require('joi');

module.exports = {
    confirmPasswordValidation : {
        body: joi.object().required().keys({
            email: joi.string().email({minDomainSegments: 2, tlds: {allow : ['com', 'hhh']}}).empty().required().messages({
                "string.email" : "please enter a valid email",
                "any.required" : "email must be entered",
                "string.empty" : "email cannot be empty"
            }),
            password : joi.string().empty().required().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).messages({
                "string.base" : "please enter a valid password",
                "any.required" : "password must be entered",
                "string.empty" : "password cannot be empty",
                "string.pattern.base" : "please enter a valid password A-Z,a-z,1-9, special character"
            })
        })
    },
    addUserValidation: {
        body: joi.object().required().keys({
            email: joi.string().email({minDomainSegments: 2, tlds: {allow : ['com', 'hhh']}}).empty().required().messages({
                "string.email" : "please enter a valid email",
                "any.required" : "email must be entered",
                "string.empty" : "email cannot be empty"
            }),
            password : joi.string().empty().required().pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).messages({
                "string.base" : "please enter a valid password",
                "any.required" : "password must be entered",
                "string.empty" : "password cannot be empty",
                "string.pattern.base" : "please enter a valid password A-Z,a-z,1-9, special character"
            }),
            firstName: joi.string().empty().required().pattern(new RegExp(/^[a-z ,.'-]+$/i)).messages({
                "string.base" : "please enter a valid first name",
                "string.empty": "first name cannot be empty",
                "any.required" : "first name must be entered",
                "string.pattern.base" : "please enter a vaild first name"
            }),
            lastName: joi.string().empty().required().pattern(new RegExp(/^[a-z ,.'-]+$/i)).messages({
                "string.base" : "please enter a valid last name",
                "string.empty": "last name cannot be empty",
                "any.required" : "last name must be entered",
                "string.pattern.base" : "please enter a vaild last name"
            }),
            userName: joi.string().empty().alphanum().required().min(5).max(20).messages({
                "string.base" : "please enter a valid user name",
                "string.empty": "user name cannot be empty",
                "any.required" : "user name must be entered",
                "string.alphanum" : "please enter a valid user name",
                "string.min" : "no. of characters must be between 5 and 20",
                "string.max" : "no. of characters must be between 5 and 20"
            }),
            age: joi.number().min(10).max(120).required().messages({
                "number.base" : "please enter a valid age",
                "number.min" : "age must be between 10 and 120",
                "number.max" : "age must be between 10 and 120",
                "any.required" : "age must be entered"
            }),
            isActive: joi.boolean().optional().messages({
                "boolean.base" : "please enter a valid is active status"
            }),
            favTeams: joi.alternatives().required().try(
                joi.string().empty().required().messages({
                    "string.base" : "please enter a valid team name",
                    "string.empty": "team name cannot be empty",
                    "any.required" : "team name must be entered",
                }),
                joi.array().min(2).required().items(joi.string().empty().required().messages({
                    "string.base" : "please enter a valid team name",
                    "string.empty": "team name cannot be empty",
                    "any.required" : "team name must be entered",
                })).messages({
                    "array.base": "please enter a valid teams",
                    "array.min": "you have to enter at least one team",
                    "any.required" : "you have to enter at least one team"
                })
            ).messages({
                "any.required" : "you have to enter at least one team"
            })
        })
    }
}