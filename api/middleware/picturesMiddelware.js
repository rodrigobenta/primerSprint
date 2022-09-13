
const verifyCreateEditPictures = (req,res,next) => {

    try {
        const {picture_id,picture_url, description} = req.body;// desestructurar
    //const name = req.name;

    if (!picture_url) {
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


const verifyByID = (req,res,next) => {

    try {
        const { id } = req.params;// desestructurar
    //const name = req.name;

    if (!id ) {
        // return res.send('Para crear el producto se necesitan nombre, precio e id');
        return res.status(400).json({
            mensaje: 'Bad Request',
            mensaje2: 'Se necesita un ID'
        });
    }
    
    next();
    } catch (error) {
        res.status(500).json({
            msg: 'Server Error'
        })
    }
};


module.exports = {verifyCreateEditPictures,verifyByID};