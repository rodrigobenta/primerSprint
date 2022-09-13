const fs = require('fs');


const listPictures = (req, res) => {



    try {
        let data = fs.readFileSync(process.env.RUTA_DB_PICTURES, 'utf-8');
        let dataParsed = JSON.parse(data);



        res.status(200).json(dataParsed);

    } catch (error) {

        console.log(error);
        res.status(500).json({

            mensaje: 'server error'
        });
    }


};

const listPictureById = (req, res) => {


    const { id } = req.params;
   
    try {
        let data = fs.readFileSync(process.env.RUTA_DB_PICTURES, 'utf-8');
        let dataParsed = JSON.parse(data);


        const dataToShow = dataParsed.find(elm => elm.picture_id === Number(id));


        if (!dataToShow) {

            return res.status(404).json({
                mensaje: 'Not found (el picturs no existe)'
            });
        }

      

        res.status(200).json(dataToShow);

    } catch (error) {
        console.log(error);
        res.status(500).json({

            mensaje: 'server error'
        });
    }
};

const createPicture = (req, res) => {

    const { picture_id, picture_url, description } = req.body;// desestructurar
      
    const nuevoPictures = {
        picture_id,
        picture_url,
        description
      
    }

    try {
        let data = fs.readFileSync(process.env.RUTA_DB_PICTURES, 'utf-8');
        let dataParsed = JSON.parse(data);

        dataParsed.push(nuevoPictures);

        fs.writeFileSync(process.env.RUTA_DB_PICTURES, JSON.stringify(dataParsed));
   

        res.status(201).json({ nuevoPictures });
    } catch (error) {
        console.log(error);
     
        res.status(500).json({
            mensaje: 'Server error'
        });

    }
};

const editPicture = (req, res) => {


    const { id, ...restoDeElementos } = req.body;
    const { IdPictures } = req.params;

    console.log(restoDeElementos);

    //404?

    try {
        const dataToParse = fs.readFileSync(process.env.RUTA_DB_PICTURES, 'utf-8');
        const data = JSON.parse(dataToParse);

        const dataUpdate = data.map(product => {

            console.log(product.picture_id, Number(IdPictures));

            if (product.picture_id == Number(IdPictures)) {

              console.log("114")

                const newEl = { ...product, ...restoDeElementos };

                return newEl;

            } else {
                return product;
            }
        });

        fs.writeFileSync(process.env.RUTA_DB_PICTURES, JSON.stringify(dataUpdate));
        res.status(200).json(dataUpdate);

    } catch (error) {

      
        res.status(500).json({
            mensaje: 'Server error'
        });
    }
};

const deletePicture = (req, res) => {



   const { id } = req.params;

   try {
       const dataToParse = fs.readFileSync(process.env.RUTA_DB_PICTURES, 'utf-8');
       const data = JSON.parse(dataToParse);

       const oldData = data.filter(el => el.picture_id === Number(id));//obj eliminado para mostrar
        console.log(oldData)
       const newData = data.filter(el => el.picture_id !== Number(id)); // esto siempre con const
       console.log(newData)

   
       if (!dataToShow) {

        return res.status(404).json({
            mensaje: 'Not found (el picturs no existe)'
        });
    }




       fs.writeFileSync(process.env.RUTA_DB_PICTURES, JSON.stringify(newData));
       //res.send('Archivo eliminado con exito');

       res.status(200).json({
            ok: "eliminado con exito",
           mensaje:  oldData
       });

   } catch (error) {
     

       res.status(500).json({
           mensaje: 'Server error'
       });

   }


};


module.exports = {
    listPictures,
    listPictureById,
    createPicture,
    editPicture,
    deletePicture
}