let User = require("../model/user.model");
let bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/token.auth");
const { sendEmail } = require("../utils/email.util")

let day = 3600000 * 24;


exports.register = async (req, res) => {
    const user = new User(req.body);
    await user.save();
    let randomActivationCode = Math.floor(Math.random() * 10000000);
    req.session.activationCode = randomActivationCode;
    req.session.user = user;
    await req.session.save()
    let subject = "Activate Account!";
    let text = "You have created a new account, please click the link to activate your account"
    let html = `<a>http://localhost:3000/activateUser/${randomActivationCode}</a>`
    await sendEmail(user.email, subject, text, html)
    res.status(200).send({ message: "Success" });
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
    }
    if (user.isActive == false) return res.status(403).json({ message: "Please Check your email for activation link!" })

    if (match) {
        req.session.cookie.expires = new Date(Date.now() + day);
        const userToken = generateToken({ user })
        req.session.user = user;
        req.session.token = userToken;
        req.session.save();
        res.status(201).send({ message: "Success", session: req.session });

    } else {
        res.status(400).send({ message: "Incorrect password" });
    }
}


exports.generateRecoveryCode = async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        let randomVerficationCode = Math.floor(Math.random() * 10000000);
        let subject = "Reset Password";
        let text = "You forgot your Password here is your recovery code"
        let html = `<b>${randomVerficationCode}</b>`
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
    let allUsers = await User.find({}).select("-password");
    res.status(200).send({ message: "Success", allUsers });
}


exports.getUserById = async (req, res) => {
    let user = await User.find({ _id: req.params.id }).select("-password");
    res.status(200).send({ message: "Success", user: user[0] });
}


exports.deleteUser = async (req, res) => {
    let user = await User.deleteOne({ _id: req.params.id });
    res.status(200).send({ message: "Success", user: user.acknowledged });
}


exports.updateUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    await User.findByIdAndUpdate({ _id: req.params.id }, { firstName, lastName, email, password });
    res.status(200).send({ message: "Success" });
}


exports.getUserBlogs = async (req, res) => {
    let user = await User.find({ _id: req.params.id }).populate("userBlogs");
    res.status(200).send({ message: "Success", user: user[0].userBlogs });
}