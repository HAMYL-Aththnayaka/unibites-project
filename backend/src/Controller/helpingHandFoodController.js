import helpingHandModel from "../Models/helpingHandModel.js";
import fs from 'fs'

export const addFood = async(req,res)=>{
    try{
        let image_filename =`${req.file.filename}`;

        const food = new helpingHandModel({
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
//list foods
export const listFood = async(req,res)=>{
    try{
        const result = await helpingHandModel.find({});

        if(result.length > 0){
            res.status(200).send({
                success:true,
                Data:result
            })
        }else{
            res.status(404).send({
                success:true,
                Alert:'No Data Found'
            })
        }
    }catch(err){
        res.status(500).send({
            success:false,
            Alert:'Error'
        })
    }
}

//remove fooditem

export const removeFood = async (req, res) => {
    try {
        const id = req.body.id;

        if (!id) {
            return res.status(403).send({
                success: false,
                alert: "Please send the Id to delete"
            });
        }

        const food = await helpingHandModel.findById(id);
        
        if (!food) {
            return res.status(404).send({
                success: false,
                alert: "Id not valid"
            });
        }
        fs.unlink(`src/uploads/${food.image}`,()=>{})
        
        const deletedResult = await helpingHandModel.findByIdAndDelete(id);
        if (!deletedResult) {
            return res.status(405).send({
                success: false,
                alert: "Something went wrong. Could not delete."
            });
        }

        res.status(200).send({
            success: true,
            alert: "Item removed successfully"
        });

    } catch (err) {
        console.log(err.toString());
        res.status(500).send({
            success: false,
            alert: "Error"
        });
    }
};

