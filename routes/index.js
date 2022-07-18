const express=require ("express");
const { body, validationResult } = require("express-validator");
router=express.Router()
const nodemailer=require("nodemailer")
router.get("/",(req,res)=>{
    res.render("index")
    })
    
router.post("/",[
    body("name","Ingrese un nombre").exists().isLength({min:2}),
    body("lastName","Ingrese un apellido").exists().isLength({min:2}),
    body("email","Ingrese un email valido").exists().isEmail(),
    body("mensaje","Su mensaje debe tener al menos 5 caracteres").exists().isLength({min:2,max:256})
],async(req,res)=>{
    const erroresReq=validationResult(req)
if(!erroresReq.isEmpty()){
    const infoCorrecta=req.body
   const erroresArr=erroresReq.array()
    console.log(erroresArr)
    res.render("index",{erroresArr,infoCorrecta})
    
}
    

    const mensajeEmail={
        to:"nombreX@gmail.com",
        from:req.body.email,
        subject:"Mensaje de formulario",
        html: `${req.body.name} ${req.body.lastName} ha enviado el siguiente mensaje: ${req.body.mensaje}`
    }
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "5bd299c47aa476",
          pass: "27e357421389d1"
        }
      });
      let estadoMensaje=""
      let enviar= await transport.sendMail(mensajeEmail)
      if(enviar.rejected.length){
        estadoMensaje="Hubo un problema,intentelo mas tarde."
      }
      else{
          estadoMensaje="Mensaje enviado."
      }
      res.render("index",{estadoMensaje})
})









    module.exports=router;