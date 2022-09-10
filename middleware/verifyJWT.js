const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    
    let bearer = req.headers.authorization; //Bearer asdpodfmaposdfmaposdfm
    let index = bearer.indexOf(' ');
    bearer = bearer.substring(index+1,bearer.length);//asdpodfmaposdfmaposdfm
    //const { authorization: token } = req.headers;
    const token = bearer;

    try {
        //const { userName, userRole} = jwt.verify(token, process.env.JWT_PASS);
        const payload = jwt.verify(token, process.env.JWT_PASS);
        //extraemos el username del payload del token,y al asignarlo al request, se pasa a la otra clase.
        req.role = payload.role;
        req.name = payload.name;

        next();
    } catch (error) {
        return res.status(401).json({
            token,
            ok: false,
            msg: "Token invalido"
        })
    }

}

module.exports = verifyJWT;