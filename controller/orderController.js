const Order = require('../models/ordersModel');
const asyncHandler = require('express-async-handler');



const getAllOrders = asyncHandler(async(req,res)=>{
    try{
        const order = await Order.find();
        res.json(order);
    }
    catch(error){
        throw new Error(error);
    }
}) 


const updateOrder = asyncHandler(async(req,res)=>{
    const {id} = req.params; 
    try{
        const order = await Order.findByIdAndUpdate({_id:id}, req.body, {new: true});
        res.json(order);
    }
    catch(error){
        throw new Error(error);
    }
}) 


module.exports = {updateOrder, getAllOrders}

