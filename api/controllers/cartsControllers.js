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
    if (!encontre) {
        i=-1;
        
    }

    return i;
    
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
                    mensaje: "OK",
                    carrito});
                    
                }
    });  
                

    if(!existe){
        //id fuera de rango
        res.status(500).json("Server error");
        }///fin del if


};

//////////////////////////////////////////////////////////////////////////////////////////////
//actualizar el carrito del usuario dado
const updateCart = (req, res) => {

try {
    let id = Number(req.params.id);
    dataUsers = getDataU(direcionBaseUsuarios);
    let indiceU = indiceUsuario(id);
    if (0 < indiceU && indiceU < dataUsers.length) {//LE ARREGLE, DARIA -1 SI NO EXISTE
        
        let carrito = getCart(id);
        let {productID, quantityNueva} = req.body;//DUDA
        let productoNuevo={
            product: productID,
            quantity: quantityNueva
        };
        let carritoNuevo;
        if (carrito!= null){
            let existeProducto= false;
            carritoNuevo = carrito.map(iter => {
                if (iter.product == productID){
                    iter.quantity= quantityNueva;
                    existeProducto= true;
                }
                else return iter;
            });//map

            if (!existeProducto) {
                carrito.push(productoNuevo);
            }
            
            if (quantityNueva==0) {
                let indiceProducto= carritoNuevo.findIndex((element)=>{element.quantity==0});
                carritoNuevo.splice(indiceProducto,1);
            }//si baja a 0 la cantidad lo elimina

            dataUsers[indiceU].cart = carritoNuevo;
            fs.writeFileSync(direcionBaseUsuarios, JSON.stringify(dataUsers));
            
            res.status(200).json({
                mensaje:"OK",
                dataUsers,
            })
        }
        else{

            carrito.push(productoNuevo);
            dataUsers[indiceU].cart = carritoNuevo;
            fs.writeFileSync(direcionBaseUsuarios, JSON.stringify(dataUsers));
            
            res.status(200).json({
                mensaje:"OK",
                dataUsers,
            });
            //no existe el carrito 404 nofoundd
            //res.status(404).json("Not Found");
        };
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

module.exports = { cartOfId, updateCart};