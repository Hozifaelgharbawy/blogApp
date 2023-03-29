let User = require("..//modules/user/user.model");
let userRepo = require("../modules/user/user.repo");
let bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/token.auth");
const { sendEmail } = require("../utils/email.util")
const LoggingService = require("../services/logger.service")
const adminLogger = new LoggingService("admin", "admin.controller")
const auditAction = require("../audit/auditAction")
const auditService = require("../audit/audit.service")

let day = 3600000 * 24;

const dateFormat = () => {
    return new Date(Date.now()).toLocaleString();
  }


exports.register = async (req, res) => {
    const user = await userRepo.create(req.body)
    if (user.success) {
        let randomActivationCode = Math.floor(Math.random() * 10000000);
        req.session.activationCode = randomActivationCode;
        req.session.user = user.record;
        await req.session.save()
        let subject = "Activate Account!";
        let text = "You have created a new account, please click the link to activate your account"
        let html = `<a>http://localhost:3000/activateUser/${randomActivationCode}</a>`
        await sendEmail(user.record.email, subject, text, html)
        res.status(user.code).json(user);
    }
    else {
        res.status(user.code).json(user);
    }

}


exports.activateUser = async (req, res) => {
    let token = req.params.token
    if (token == req.session.activationCode) {
        await User.findByIdAndUpdate({ _id: req.session.user._id }, { isActive: true });
        res.status(200).send({ message: "Success" });
    } else res.status(400).json({ message: "Incorrect Token!" })

}


exports.login = async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
        var match = await bcrypt.compare(password, user.password);

        //if (user.isActive == false) return res.status(403).json({ message: "Please Check your email for activation link!" })

        if (match) {
            // req.session.cookie.expires = new Date(Date.now() + day);
            // const userToken = generateToken({ user })
            // req.session.user = user;
            // req.session.token = userToken;
            // req.session.save();
            res.status(201).send({ code: 201, message: "Success" });

        } else {
            res.status(400).send({code:400, message: "Incorrect password" });
        }
    }
    else {
        res.status(404).send({ code: 404, message: "user not found" });
    }
}


exports.generateRecoveryCode = async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        let randomVerficationCode = Math.floor(Math.random() * 10000000);
        let subject = "Reset Password";
        let text = "You forgot your Password here is your recovery code"
        let html = `<h1>${randomVerficationCode}</h1>`
        await sendEmail(user.email, subject, text, html)
        req.session.recoveryCode = randomVerficationCode;
        await req.session.save()
        res.status(201).json({ message: `Recovery Code has been sent to ${user.email}!` })
    }

    else res.status(404).json({ message: "Email Not Found!" })
}


exports.checkRecoveryCode = async (req, res) => {
    if (req.body.recoveryCode == req.session.recoveryCode)
        res.status(200).json({ message: "Success!" })

    else res.status(409).json({ message: "Incorrect Code!" })
}


exports.getAllUsers = async (req, res) => {
    let result = await userRepo.list();
    let info = { Action: req.originalUrl, Status: result.code }
    adminLogger.info("return All Users");
    auditService.prepareAudit(auditAction.actionList.GET_ALL_USERS, result.records, null, "user", dateFormat())
    res.status(result.code).json(result);
}


exports.getUserById = async (req, res) => {
    let result = await userRepo.get(req.params.id);
    if (result.success) {
        res.status(result.code).json(result);
    }
    else {
        res.status(result.code).json(result);
    }
}


exports.deleteUser = async (req, res) => {
    let result = await userRepo.remove(req.params.id);
    if (result.success) {
        res.status(result.code).json(result);
    }
    else {
        res.status(result.code).json(result);
    }
}


exports.updateUser = async (req, res) => {
    let result = await userRepo.update(req.params.id, req.body);
    res.status(result.code).json(result);
}


exports.getUserBlogs = async (req, res) => {
    let user = await User.find({ _id: req.params.id }).populate("userBlogs");
    res.status(200).send({ message: "Success", user: user[0].userBlogs });
}