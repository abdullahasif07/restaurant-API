import express from 'express'
import { addOrder } from '../controllers/orderController.js';
import fetchUser from '../middleware/Fetchuser.js';
import { body } from "express-validator";


const orderRoutes = express.Router();


orderRoutes.post('/addorder',
    [
        body('user_id', 'User id is required').notEmpty(),
        body('items', 'items are required').notEmpty(),
        body('amount', 'amount id is required').notEmpty(),
        body('delivery_details', 'delivery_details is required').notEmpty(),
        body('payment_method', 'payment_method is required').notEmpty(),
    ],
    fetchUser,
    addOrder
 );


 export default orderRoutes;