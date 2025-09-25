import foodModel from "../Models/foodModel.js";
import fs from 'fs'


//add food item
export const addFood = async(req,res)=>{
    try{
        let image_filename =`${req.file.filename}`;

        const food = new foodModel({
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            catagory:req.body.catagory,
            image:image_filename
        });

        await food.save();
        res.status(200).send({
            success:true,
            alert:"Food Added"
        })
    }catch(err){
        console.log(err.toString());
        res.status(500).send({
            Alert:"Food Not added"
        })
    }
}