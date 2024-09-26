const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
    Products:[{
        Product:{
            type : mongoose.Schema.Types.ObjectId,
            ref : "Product"
        },
        count : Number,
        color : String,
    }],
    PaymentIntent: {
        id: String,
        method: String,
        amount: Number,
        status: String,
        created: Date,
        currency: String
    },    
    orderStatus:{
        type:String,
        default : "Not Processed",
        enum : ["Not Processed","Processing","Processed","Dispatched", "Out for Delevery", "Delivered", "Canclled"]
    },
    orderBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref :"User"
    },
    address:String,
    phoneNumber:String,

    },{
        timestamps: true,
    }
);

//Export the model
module.exports = mongoose.model('Order', orderSchema);