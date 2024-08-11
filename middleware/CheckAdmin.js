
import User from "../models/User.js";
import { validationResult } from 'express-validator';

const CheckAdmin = async (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Validation errors:", errors.array());
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        else {
            if(user.role !== 'admin'){

                return res.status(401).json({ error: 'User not Admin' });
            }
        }
    next();
}
export default CheckAdmin;
