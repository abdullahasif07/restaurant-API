import { validationResult } from 'express-validator';
import Orders from '../models/Order.js';


export const addOrder = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Validation errors:", errors.array());
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const order = new Orders({
        user_id:req.body.user_id,
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