import {Router} from "express";

const routes = Router();

routes.get( '/algumacoisa',(req,res)=>{
  return res.status(200).json({msg:'hello world'});
})



export {routes};