

const createUserVerify = (req,res,next) =>{
    let { id, email, username, password, firstname, lastname, profilepic, role} = req.body;
    if(!id || !email || !username || !password || !firstname || !lastname) 
        return res.status(400).json({Mensaje: 'Para crear un usuario debe contener todos los elementos'});
    if(!role)
        role= "guest";
    if(profilepic)
        profilepic = req.profilepic;

    next();
};

const verifyRoleList = (req , res, next) => {
    let idDb = Number(req.id);
    let id = Number(req.params.id);
    let role = req.role;

    if (role === 'guest' && (id !== idDb))
        return res.status(401).json({ Mensaje: 'No tienes permisos.' });
    
    next();
}

const verifyRoleEdit = (req , res, next) => {
    let idDb = Number(req.id);
    let id = Number(req.params.id);
    let role = req.role;

    if( role === 'admin' || (role === 'guest' && (id !== idDb)))
        return res.status(401).json({ Mensaje: 'No tienes permisos para editar.' });
    
    next();
}

const verifyRoleDelete = (req, res, next) => {
    let role = req.role;

    if(role === 'guest' || role === 'admin')
        return res.status(401).json({ Mensaje: 'No tienes permisos para eliminar.' });
    
    next();
}

module.exports = {createUserVerify, verifyRoleList, verifyRoleEdit, verifyRoleDelete}