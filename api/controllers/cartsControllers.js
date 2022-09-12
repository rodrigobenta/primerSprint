const fs = require("fs");
const jwt = require("../../helpers/generateJWT");
const users = require("../data.users.json");



//busca y trae el carrito de el usuario determinado...(el id existe)
function getCart(usuarioID){
    
    let usuario= users.find((u)=> u.id === usuarioID);

    let carrito = usuario.cart;
    return carrito;
}//getcart



// devuelve el carrito del usuario identificado con ID
const cartOfId = (req, res) => {
    let id = Number(req.params.id);

    if (0 < id && id < users.length) {
        let carrito = getCart(id);
        res.send(carrito.cart);
    } else {
        //id fuera de rango

    }///fin del if
};

//actualizar el carrito del usuario dado
const updateCart = (req, res) => {

    let id = Number(req.params.id);

    if (0 < id && id < users.length) {
        
        let carrito = getCart(id);
        if (carrito!= null){
            let {productID, quantityNueva} = req.body;
            carrito.product = productID;
            carrito.quantity = quantityNueva;


            fs.writeFileSync("../data/users.js", JSON.stringify(users));
            

        }
        else{
            //no existe el carrito 404 nofound
        }

    }
    else{
        //no esta el usuario
    }

};

module.exports = { cartOfId, updateCart };