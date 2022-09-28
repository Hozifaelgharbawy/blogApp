let jwt = require("jsonwebtoken")

exports.generateToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1800s' })
}

exports.verifyToken = (req, res, next) => {
    let authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]
    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
            if (err) return res.status(403).json({ message: "Invalid Token!" })
            next()
        })

    } else return res.status(401).json({ message: "Unauthorized!" })
}



