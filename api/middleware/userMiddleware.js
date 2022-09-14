

const createUserVerify = (req,res,next) =>{
    let { id, email, username, password, firstname, lastname, profilepic, role} = req.body;
    if(!email || !username || !password || !firstname || !lastname) 
        return res.status(400).json({Mensaje: 'Para crear un usuario debe contener todos los elementos'});
    if(!role)
        req.body.role = 'guest';
    if(profilepic)
        profilepic = req.profilepic;

    next();
};

const verifyRoleList = (req , res, next) => {
    let idDb = Number(req.id);
    let id = Number(req.params.id);
    let role = req.role;
    role = role.toLowerCase();

    if (role === 'guest' && (id !== idDb))
        return res.status(401).json({ Mensaje: 'No tienes permisos.' });
    
    next();
}

const verifyRoleEdit = (req , res, next) => {
    let idDb = Number(req.id);
    let id = Number(req.params.id);
    let role = req.role.toLowerCase();
    //role = role.toLowerCase();

    if( (role === 'admin' && (id !== idDb))  || (role === 'guest' && (id !== idDb)))
        return res.status(401).json({ Mensaje: 'No tienes permisos' });
    
    next();
}


module.exports = {createUserVerify, verifyRoleList, verifyRoleEdit}