
exports.handleCorsPolicy = async (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Credentials", true);
    const allowedMethods = ["POST", "GET", "PUT", "PATCH", "DELETE"]
    res.header("Access-Control-Allow-Methods", allowedMethods.join());
    
    if (allowedMethods.includes(req.method)) next()
    else return res.status(401).json({ message: "Blocked By CORS Policy!" });

   
}
