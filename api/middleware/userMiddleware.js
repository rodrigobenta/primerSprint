

const createUserVerify = (req,res,next) =>{
    const { id, email, username, password, firstname, lastname, profilepic, role} = req.body;
    if(!id || !email || !username || !password || !firstname || !lastname) 
       return res.status(400).json({Mensaje: 'Para crear un producto debe contener todos los elementos'});
    if(!role)
        role= 'guest';
    if(profilepic)
        profilepic = req.profilepic;

    next();
};

const verifyRoleList = (req = request, res, next) => {
    const idDb = Number(req.id);
    const id = Number(req.params.id);
 
    if( role === 'admin')
       return res.status(401).json({ Mensaje: 'No tienes permisos.' });
    if (role === 'guest' && (id !== idDb))
       return res.status(401).json({ Mensaje: 'No tienes permisos.' });
    
    next();
}

const verifyRoleEdit = (req = request, res, next) => {
    const idDb = Number(req.id);
    const id = Number(req.params.id);

    if( role === 'admin')
       return res.status(401).json({ Mensaje: 'No tienes permisos.' });
    if (role === 'guest' && (id !== idDb))
       return res.status(401).json({ Mensaje: 'No tienes permisos.' });
    
    next();
}

module.exports = {createUserVerify, verifyRoleList, verifyRoleEdit}