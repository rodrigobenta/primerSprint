const jwt = require('jsonwebtoken');
const { request } = require('express')

const verifyAdmin = (req = request, res, next) => {

   // console.log(req.headers);
   const   role  = req.role;

   try {
     
      

      next();
   } catch (error) {
      console.log(error);
      return res.status(401).json({
         ok: false,
         msg: "No sos Admin"
      })
   }

}

module.exports = verifyAdmin