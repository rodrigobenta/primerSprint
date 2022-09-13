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

//traeUnUsuario
function indiceUsuario(usuarioID) {

    let totalUsuarios= getDataU(direcionBaseUsuarios);
    let i= 0;
    let encontre= false;
    
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
        let { product, quantity } = req.body;//DUDA
        
        let productoNuevo={
            product: product,
            quantity: quantity
        };
        
        let carritoNuevo = [ ];
        if (carrito){
            
            let existeProducto= false;
            carrito = carrito.filter(x=>!!x);  //filtramos valores null, vacios y NaN en el carrito
        
            carritoNuevo = carrito.map((el) => {
                if(el.product === product){
                    el.quantity = quantity;
                    existeProducto = true;
                }
                return el;
            });//map
            
            if (!existeProducto) {
                carritoNuevo.push(productoNuevo);
            }
            
            if (quantity == 0) {
                let indiceProducto= carritoNuevo.findIndex((element)=>{element.quantity==0});
                carritoNuevo.splice(indiceProducto,1);
            }//si baja a 0 la cantidad lo elimina

            dataUsers[indiceU].cart = carritoNuevo;
            fs.writeFileSync(direcionBaseUsuarios, JSON.stringify(dataUsers));
            
            res.status(200).json({ CarritoNuevo: carritoNuevo});
        }
        else{

            // carrito.push(productoNuevo);
            // dataUsers[indiceU].cart = carrito;
            // fs.writeFileSync(direcionBaseUsuarios, JSON.stringify(dataUsers));
            // res.status(200).json({ CarritoNuevo: carrito});
            //no existe el carrito 404 nofoundd
            res.status(404).json({Mensaje: " No existe un carrito."});
        };
    }
    else{
        //no esta el usuario
        res.status(500).json({Mensaje: "Server error o id fuera de rango"});
    };//findel if
        
    } catch (error) {
        
        res.status(500).json("server error");
    };
}//updatecarrito recontraineficientejaja

module.exports = { cartOfId, updateCart};