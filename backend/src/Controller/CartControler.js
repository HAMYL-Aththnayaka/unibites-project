import userModel from '../Models/userModel.js'


//add to cart
export const addToCart =async(req,res)=>{
        try{
<<<<<<< HEAD
                let userData = await userModel.findOne({_id:req.body.userId})// findbyid ok 2
=======
                let userData = await userModel.findOne({_id:req.body.userId})//findbyid ok 2
>>>>>>> 8a8578765ba736a6adb877a93e4076ce683b3ed7
                let cartData = await userData.cartData;

                if(!cartData[req.body.itemId]){
                    cartData[req.body.itemId] = 1;
                }else{
                    cartData[req.body.itemId]+=1;
                }
                await userModel.findByIdAndUpdate(req.body.userId,{cartData});
                res.status(200).send({
                    success:true,
                    alert:"Added to Cart"
                })

        }catch(err){
             console.log(err.toString())
            res.status(500).send({   
                success:false,
                alert:err.toString()
            })
        }
}

//remove from cart
export const removeFromCart =async(req,res)=>{
    try{
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;

        if(cartData[req.body.itemId] > 0){
            cartData[req.body.itemId] -=1;
        }

        await userModel.findByIdAndUpdate(req.body.userId,{cartData});

        res.status(200).send({
            success:true,
            alert:"Removed Form Cart"
        })
    }catch(err){
            onsole.log(err.toString())
            res.status(500).send({   
                success:false,
                alert:err.toString()
            })

    }
}

//fetch cart data
export const getCart =async(req,res)=>{
    try{
      
        let userData = await userModel.findById(req.body.userId);
   
        if(!userData){
           res.status(200).send({
                success:false,
                alert:"userData notfound"
            })
        }
             
        const cartData = userData.cartData || [];
        const isEmpty = Object.keys(cartData).length === 0;

        res.status(200).send({
            success: true,
            cartData,
            message: isEmpty ? 'Cart is empty' : undefined
<<<<<<< HEAD
        });          
=======
        });

                

>>>>>>> 8a8578765ba736a6adb877a93e4076ce683b3ed7
    }catch(err){
        console.log(err.toString())
            res.status(500).send({   
                success:false,
                alert:err.toString()
            })
    }
}
