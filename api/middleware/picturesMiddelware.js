
const verifyCreateEditPictures = (req,res,next) => {

    try {
        const {picture_id,picture_url, description} = req.body;// desestructurar
    //const name = req.name;

    if (req.method!= 'PUT' && !picture_url) {
        // return res.send('Para crear el producto se necesitan nombre, precio e id');
        return res.status(400).json({
            mensaje: 'Faltan campos necesarios para crear la picture'
        });
    }
    
    next();
    } catch (error) {
        res.status(500).json({
            msg: 'Server Error'
        })
    }
};

const verifyRoleEditPicture = (req,res,next) => {
    try {
        let role = req.role;
        if(role == 'guest') res.status(401).json({msg: 'No tiene permisos sobre las pictures'});
        else next();
    } catch (error) {
        res.status(500).json({msg: 'Server error'});
    }
}

module.exports = {verifyCreateEditPictures, verifyRoleEditPicture};