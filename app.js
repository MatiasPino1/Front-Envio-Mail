"use strict"
const express=require ("express");
const PORT =3030;
const hbs = require("hbs")
const path=require("path")
const app=express()
app.set("view engine","hbs")
const routeIndex=require("./routes/index")
app.use(express.urlencoded({extended:false}))
app.use("/",routeIndex)
app.use(express.static(path.join(__dirname,"./public")))

hbs.registerPartials(path.join(__dirname,"./views/partials"))




app.listen(PORT,()=>{
    console.warn(`Server corriendo en http://localhost:${PORT}`)
})