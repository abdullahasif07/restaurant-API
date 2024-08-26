import { validationResult } from 'express-validator';
import Orders from '../models/Order.js';


export const addOrder = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Validation errors:", errors.array());
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const order = new Orders({
        user_id:req.user.id,
        amount:req.body.amount,
        delivery_details:req.body.delivery_details,
        payment_method:req.body.payment_method,
        items:req.body.items,
        status:req.body.status?req.body.status:'pending',
    })

    try {
        
        order.save();
    
        return res.status(200).json({ success: true, message:'Order pending' });
    } catch (error) {
        return res.status(400).json({ success: false, message:'some internal error occured' });
    }
}

export const updateOrderStatus = async (req, res) => {
    try {
      const { orderId, status } = req.body;
  
      if (!orderId || !status) {
        return res.status(400).json({ success: false, message: "Order ID and status are required" });
      }

      const order = await Orders.findById(orderId);
      
      if(order.user_id.toString() !== req.user.id){
        return res.status(403).json({ success: false, message: "illegal access" });
      }
  
      const updatedOrder = await Orders.findByIdAndUpdate(
        orderId,
        { status }, 
        { new: true }
      );
  
      if (!updatedOrder) {
        return res.status(404).json({ success: false, message: "Order not found" });
      }
  
      return res.status(200).json({ success: true, message: "Order status updated", order: updatedOrder });
  
    } catch (error) {
      console.error("Error updating order status:", error);
      return res.status(500).json({ success: false, message: "Server error", error });
    }
  };


  export const getOrderOfUser = async (req, res) => {
    try {
      const userId = req.user.id;
  
      if (!userId) {
        return res.status(400).json({ success: false, message: "user Id are required" });
      }

      const orders = await Orders.find({ user_id: userId });

      if (orders.length === 0) {
        return res.status(404).json({ success: false, message: "No orders found for this user" });
      }
      
  
      return res.status(200).json({ success: true, orders});
  
    } catch (error) {
      console.error("Error getting orders:", error);
      return res.status(500).json({ success: false, message: "Server error", error });
    }
  };