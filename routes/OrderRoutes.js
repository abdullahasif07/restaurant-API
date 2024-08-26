import express from 'express'
import { addOrder, getOrderOfUser, updateOrderStatus } from '../controllers/orderController.js';
import fetchUser from '../middleware/Fetchuser.js';
import { body } from "express-validator";


const orderRoutes = express.Router();


orderRoutes.post('/addorder',
    [
        body('items', 'items are required').notEmpty(),
        body('amount', 'amount id is required').notEmpty(),
        body('delivery_details', 'delivery_details is required').notEmpty(),
        body('payment_method', 'payment_method is required').notEmpty(),
    ],
    fetchUser,
    addOrder
 );

 orderRoutes.post('/updatestatus',
    [
        body('status', 'status is required').notEmpty(),
        body('orderId', 'orderId are required').notEmpty()
    ],
        
    fetchUser,
    updateOrderStatus
 );

 orderRoutes.get('/getorders',        
    fetchUser,
    getOrderOfUser
 );



 export default orderRoutes;