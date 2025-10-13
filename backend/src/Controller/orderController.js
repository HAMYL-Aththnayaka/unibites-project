import pkg from '@paypal/checkout-server-sdk';
const paypal = pkg;
const { payments } = pkg;

import orderModel from '../Models/orderModel.js'

// Setup PayPal client (Sandbox for testing)
const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_SECRET
);
const client = new paypal.core.PayPalHttpClient(environment);

// Step 1: Create a PayPal order (checkout link)
export const createPayPalOrder = async (req, res) => {
  try {
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",          
            value: req.body.amount,       
          }
        }
      ],
      application_context: {
        return_url: "http://localhost:5173/verify?success=true",
        cancel_url: "http://localhost:5173/verify?success=false"
      }
    });

    const order = await client.execute(request);
    // Find the PayPal checkout link
    const approvalUrl = order.result.links.find(link => link.rel === "approve").href;

    res.json({
         success: true, 
         url: approvalUrl });

  } catch (err) {
    res.status(500).json({
        success: false, 
        error: err.message
     });
  }
};

// Step 2: Capture payment after user approves
export const capturePayPalOrder = async (req, res) => {
  try {
    const orderId = req.body.orderId; // sent from frontend after redirect
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});

    const capture = await client.execute(request);
    res.json({
         success: true,
        details: capture.result
     });

  } catch (err) {
    res.status(500).json({
        success: false, 
        error: err.message });
  }
};
export const  veruifyOrder = async(erq,res)=>{
  const {orderId ,success} = req.body;
  try{
      if (success =="true"){
        await orderModel.findByIdAndUpdate(orderId,{payment:true});
        res.json({success:true,
          message:"Paid"
        })
      }else{
        await orderModel.findByIdAndDelete(orderId);
                res.json({
          success:false,
          message:"Not Paid"
        })
      }
  }catch(err){

  }
  
}
export const userOrder = async(req,res)=>{
    try{
      const orders = await orderMOdel.find({userId :req.nody.userId})
      res.status(200).send({
        success:true,
        data:orders
      })
    }catch(err){
      res.status(500).send({
        success:false,
        alert:'error'
      })
    }
}


//userOrders fro front End

//listing orders fr admin pannel

export const listOrders = async(req,res)=>{
    try{
        const orders = await orderModel.find({})
        res.status(200).send({
          success:true,
          data:orders
        })
    }catch(err){
      console.log(err);
      res.status(500).send({
        alert:err.toString()
      })
    }
}