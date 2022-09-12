const fs = require("fs");
const jwt = require("../../helpers/generateJWT");
const users = require("../data.users.json");
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
        console.log("error en carritos get data, al leer el json");
        return error;
    }
}

//traeUnUsuario
function indiceUsuario(usuarioID) {

    let totalUsuarios= getDataU(direcionBaseUsuarios);
    let i= 0;
    encnote= false;
    while (i<totalUsuarios.length && !encontre) {
        if (totalUsuarios[i].id == usuarioID){
            encontre=true;
        }
        i++;
    }
    return i;
    
}

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

    if (0 < id && id < usuarios.length) {
        let carrito = getCart(id);

        res.status(200).json({
                mensaje: "OK",
                carrito});
    } else {
        //id fuera de rango
        res.status(500).json("server error")
    }///fin del if
};



//////////////////////////////////////////////////////////////////////////////////////////////
//actualizar el carrito del usuario dado
const updateCart = (req, res) => {

try {
    
    let id = Number(req.params.id);
    dataUsers = getDataU(direcionBaseUsuarios);
    if (0 < id && id < dataUsers.length) {
        
        let carrito = getCart(id);

        if (carrito!= null){

            let {productID, quantityNueva} = req.body;//DUDA
            
            
            let carritoNuevo = carrito.map(iter => {
                if (iter.product == productID){
                    iter.quantity= quantityNueva;

                }
                else return iter;
            });//map
            
            if (quantityNueva==0) {
                let indiceProducto= carritoNuevo.findIndex((element)=>{element.quantity==0});
                carritoNuevo.splice(indiceProducto,1);
            }//si baja a 0 la cantidad lo elimina

            let indice = indiceUsuario(id);
            dataUsers[indice].cart = carritoNuevo;

            fs.writeFileSync(direcionBaseUsuarios, JSON.stringify(dataUsers));
            
            res.status(200).json({
                mensaje:"OK",
                dataUsers,

            })
        }
        else{
            //no existe el carrito 404 nofoundd
            res.status(404).json("Not Found");
        }
    
    }
    else{
        //no esta el usuario
        res.status(500).json("server error o id fuera de rango")
    };//findel if
        
    } catch (error) {
        console.log("error en updatecarrito");
        res.status(500).json("server error");
    };
}//updatecarrito recontraineficientejaja

module.exports = { cartOfId, updateCart };