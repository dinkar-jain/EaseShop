import jwt from "jsonwebtoken";

const getToken = (User) => {
    return jwt.sign(User.toJSON(), process.env.JWT_SECRET, {
        expiresIn: 86400
    })
}

const getSignOutToken = (User) => {
    return jwt.sign(User.toJSON(), process.env.JWT_SECRET, {
        expiresIn: 1
    })
}

const IsAuth = (req, res, next) => {
    const Token = req.headers.authorization;
    if (Token) {
        jwt.verify(Token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({ msg: "Invalid Token" })
            }
            req.User = decode;
            next();
            return
        })
    }

    else {
        return res.status(401).send({ msg: "Token Is Not Supplied" })
    }
}

const IsAdmin = (req, res, next) => {
    if (req.User && req.User.IsAdmin) {
        return next();
    }
    return res.status(401).send({ msg: "Admin Token Is Not Valid" })
}

export { getToken, getSignOutToken, IsAuth, IsAdmin }