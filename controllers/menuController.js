import MenuItem from "../models/MenuItem.js";
import { validationResult } from 'express-validator';
//import User from "../models/User.js";


export const addItem = async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Validation errors:", errors.array());
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        // const user = await User.findById(req.user.id).select('-password');
        // if (!user) {
        //     return res.status(404).json({ error: 'User not found' });
        // }
        // else {
        //     if(user.role !== 'admin'){

        //         return res.status(401).json({ error: 'User not Admin' });
        //     }
        // }
        
        let item = await MenuItem.findOne({ name: req.body.name });
        if (item) {
            return res.status(400).json({ success: false, error: "name already exists, enter a new one" });
        }
        const newItem = new MenuItem({
            name: req.body.name, 
            price: req.body.price,
            category: req.body.category,
            image: req.body.image,
            ingredients: req.body.ingredients,
            availabe: req.body.availabe,
            rating: req.body.rating
        });

        newItem.save();

        return res.status(200).json({ success: true, message:'item saved' });


    } catch (error) {
        console.error('Error creating item:', error);
        return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}


export const updateItem = async (req,res) =>{
    try {
        
        const { name, price, category,image,ingredients,availabe,rating } = req.body;
        const temp = {};
        if(name){temp.name = name;}
        if(price){temp.price = price;}
        if(category){temp.category = category;}
        if(image){temp.image = image;}
        if(ingredients){temp.ingredients = ingredients;}
        if(availabe){temp.availabe = availabe;}
        if(rating){temp.rating = rating;}

        let item = await MenuItem.findById(req.params.id);
        if(!item){return res.status(404).send("ITEM NOT FOUND");}

        item = await MenuItem.findByIdAndUpdate(req.params.id,{$set:temp},{new:true});
        return res.status(200).send("updated successfully");
    } catch (error) {
        console.error('Error during updation:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


export const deleteItem = async (req,res) =>{
    try {
    
        let item = await MenuItem.findById(req.params.id);
        if(!item){return res.status(404).send("ITEM NOT FOUND");}

        item = await MenuItem.findByIdAndDelete(req.params.id);
        return res.status(200).send("deleted successfully");
    } catch (error) {
        console.error('Error during deletion:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}