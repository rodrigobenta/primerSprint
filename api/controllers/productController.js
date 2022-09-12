const e = require('express');
const fs = require('fs');
const jwt = require('../../helpers/generateJWT')


const listProduct = (req, res) => {


    try {
        let data = fs.readFileSync(process.env.RUTA_DB_PRODUCT, 'utf-8');
        let dataParsed = JSON.parse(data);



        res.status(200).json(dataParsed);

    } catch (error) {
        console.log(error);
        res.status(500).json({

            mensaje: 'server error'
        });
    }

}



const listProductByID = (req, res) => {

    const { id } = req.params;
   
    try {
        let data = fs.readFileSync(process.env.RUTA_DB_PRODUCT, 'utf-8');
        let dataParsed = JSON.parse(data);


        const dataToShow = dataParsed.find(elm => elm.id === Number(id));


        if (!dataToShow) {

            return res.status(404).json({
                mensaje: 'Not found (el producto no existe)'
            });
        }

      

        res.status(200).json(dataToShow);

    } catch (error) {
        console.log(error);
        res.status(500).json({

            mensaje: 'server error'
        });
    }

}


const createProduct = (req, res) => {


    const { title, price, id,description,image,gallery,category, mostwanted,stock} = req.body;// desestructurar
    const name = req.name;

    if (!title || !price || !id || !image || !gallery || !category || !mostwanted || !stock) {
        // return res.send('Para crear el producto se necesitan nombre, precio e id');
        return res.status(200).json({
            mensaje: 'No puede haber elemntos vacios'
        });

    }

    const nuevoProducto = {
        id,
        title,
        price,
        description,
        image,
        gallery,
        category,
        mostwanted,
        stock
    }

    try {
        let data = fs.readFileSync(process.env.RUTA_DB_PRODUCT, 'utf-8');
        let dataParsed = JSON.parse(data);

        dataParsed.push(nuevoProducto);

        fs.writeFileSync(process.env.RUTA_DB_PRODUCT, JSON.stringify(dataParsed));
   

        res.status(201).json({ nuevoProducto });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            mensaje: 'Bad request'
        });
        res.status(500).json({
            mensaje: 'Server error'
        });

    }
}


const editroduct = (req, res) => {
   

    const { id, ...restoDeElementos } = req.body;
    const { idProduct } = req.params;

    console.log(restoDeElementos);

    //404?

    try {
        const dataToParse = fs.readFileSync(process.env.RUTA_DB_PRODUCT, 'utf-8');
        const data = JSON.parse(dataToParse);

        const dataUpdate = data.map(product => {

            console.log(idProduct, product.id);

            if (product.id == Number(idProduct)) {

              

                const newEl = { ...product, ...restoDeElementos };

                return newEl;

            } else {
                return product;
            }
        });

        fs.writeFileSync(process.env.RUTA_DB_PRODUCT, JSON.stringify(dataUpdate));
        res.status(200).json(dataUpdate);

    } catch (error) {

      
        res.status(500).json({
            mensaje: 'Server error'
        });
    }
}

const listProductByKeyword = (req, res) => {


    const { keyword } = req.params;
   
    try {
        let data = fs.readFileSync(process.env.RUTA_DB_PRODUCT, 'utf-8');
        let dataParsed = JSON.parse(data);


        const dataToShow = dataParsed.find(elm => elm.title === Number(id));

        let newList =[];

        dataParsed 

        dataParsed.forEach(element => {

            if(element.title === keyword || element.description === keyword|| element.category === keyword ){

                    newList.push(element)
            }
            
        });

      

        res.status(200).json(newList);

    } catch (error) {
        console.log(error);
        res.status(500).json({

            mensaje: 'server error'
        });
    }

}

const listProductMostwated = (req, res) => {


   
    try {
        let data = fs.readFileSync(process.env.RUTA_DB_PRODUCT, 'utf-8');
        let dataParsed = JSON.parse(data);


        const dataToShow = dataParsed.find(elm => elm.mostwanted === true);


        if (!dataToShow) {

            return res.status(404).json({
                mensaje: 'Not found (el producto no existe)'
            });
        }

      

        res.status(200).json(dataToShow);

    } catch (error) {
        console.log(error);
        res.status(500).json({

            mensaje: 'server error'
        });
    }

}



const deleteProduct = (req, res) => {

   const { id } = req.params;

   try {
       const dataToParse = fs.readFileSync(process.env.RUTA_DB_PRODUCT, 'utf-8');
       const data = JSON.parse(dataToParse);

       const oldData = data.filter(el => el.id === Number(id));//obj eliminado para mostrar

        if(oldData){
            res.status(404).json({
                mensaje: 'Not found'
            });

        }
       const newData = data.filter(el => el.id !== Number(id)); // esto siempre con const

   



       fs.writeFileSync(process.env.RUTA_DB_PRODUCT, JSON.stringify(newData));
       //res.send('Archivo eliminado con exito');

       res.status(200).json({
           mensaje: `Archivo eliminado con exito ${oldData}`
       });

   } catch (error) {
     

       res.status(500).json({
           mensaje: 'Server error'
       });

   }
 
}

module.exports = { listProduct,listProductByID ,listProductByKeyword, listProductMostwated, createProduct, editroduct, deleteProduct };