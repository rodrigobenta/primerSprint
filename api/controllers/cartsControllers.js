const fs = require("fs");

//direccion
const direcionBaseUsuarios= process.env.RUTA_DB_USER;
const ayrtonMode = true; //

//lee y trae la informacion del carrito
function getDataU(direccion){
    try {
        let data = fs.readFileSync(direccion, 'utf-8');
        data = JSON.parse(data);
        return data;
    } catch (error) {
        return error;
    }
}

/////////////////////////////////////////////////////////////////////////
//busca y trae el carrito de el usuario determinado...(el id existe)
function getCart(usuarioID){
    
    let totalUsuarios = getDataU(direcionBaseUsuarios);
    let usuario= totalUsuarios.find((u)=> u.id === usuarioID);

    let carrito = usuario.cart;
    return carrito;
}//getcart

////////////////////////////////////////////////////////////////////////////////////////
// devuelve el carrito del usuario identificado con ID
const cartOfId = (req, res) => {
    let id = Number(req.params.id);
    let usuarios = getDataU(direcionBaseUsuarios);
    let existe= false;
    usuarios.forEach(element => {
        if(element.id == id){
            existe= true;
            let carrito = getCart(id);
            res.status(200).json({
                Carrito: carrito
            });
        }
    });              

    if(!existe){
        //id fuera de rango
        res.status(500).json({Mensaje: "Server error"});
    }///fin del if
};

//////////////////////////////////////////////////////////////////////////////////////////////
//actualizar el carrito del usuario dado
const updateCart = (req, res) => {

try {
    let id = Number(req.params.id);
    dataUsers = getDataU(direcionBaseUsuarios);
    let indiceU = dataUsers.findIndex((el)=> el.id === id )
    
    if (indiceU !== -1) {//LE ARREGLE, DARIA -1 SI NO EXISTE
        let carrito = getCart(id);
        let cartNuevo = req.body;
        carrito = cartNuevo;
        dataUsers[indiceU].cart = carrito;
        fs.writeFileSync(direcionBaseUsuarios, JSON.stringify(dataUsers));
        res.status(200).json({ CarritoNuevo: carrito});
    }
    else{
        //no esta el usuario
        res.status(500).json({Mensaje: "Server error o id fuera de rango"});
    };//findel if
        
    } catch (error) {
        
        res.status(500).json("server error");
    };
}//updatecarrito 

module.exports = { cartOfId, updateCart};