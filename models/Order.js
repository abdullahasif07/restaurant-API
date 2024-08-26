import mongoose from "mongoose";

const orderSchema =new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: { type: Date, default: Date.now },
    items: [
        {
          name: String,
          quantity: Number,
          price: Number,
        }
      ],
    amount:{
        required:true,
        type:Number
    },
    status: {
        type: String,
        enum: ['pending', 'preparing', 'ready', 'completed', 'cancelled'],
        default: 'pending',
      },
    delivery_details:{
        required:true,
        type:String
    },
    payment_method:{
        required:true,
        type:String,
        enum:['cash on delivery','credit card']
    }

})

const Orders = mongoose.model('Orders',orderSchema)

export default Orders;