
const verifyCreateEdit = (req,res,next) => {

    try {
        const { title, price, id,description,image,gallery,category, mostwanted,stock} = req.body;// desestructurar
    //const name = req.name;

    if (!title || !price || !id || !image || !gallery || !category || !mostwanted || !stock) {
        // return res.send('Para crear el producto se necesitan nombre, precio e id');
        return res.status(400).json({
            mensaje: 'Bad Request',
            mensaje2: 'Faltan campos necesarios para crear producto'
        });
    }
    
    next();
    } catch (error) {
        res.status(500).json({
            msg: 'Server Error'
        })
    }
};

const verifyRoleCreateDelete = (req,res,next) => {
    try {
        let role = req.role;
        if(role === 'guest' || role === 'admin') res.status(401).json({msg: 'No tiene permisos'});
        next();
    } catch (error) {
        res.status(500).json({msg: 'Server error'});
    }
}


const verifyRoleEdit = (req,res,next) => {
    try {
        let role = req.role;
        if(role === 'guest') res.status(401).json({msg: 'No tiene permisos'});
        next();
    } catch (error) {
        res.status(500).json({msg: 'Server error'});
    }
}



module.exports = {verifyRoleCreateDelete, verifyRoleEdit, verifyCreateEdit};