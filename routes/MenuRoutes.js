import express from "express";
import { addItem, deleteItem, updateItem, getItems } from "../controllers/menuController.js";
import fetchUser from "../middleware/Fetchuser.js";
import { body } from "express-validator";
import CheckAdmin from "../middleware/CheckAdmin.js";

const menuRoutes = express.Router();

menuRoutes.post(
  "/menu/additem",
  [
    body("ingredients", "Ingredients are required").notEmpty(),
    body("name", "name is required").notEmpty(),
    body("price", "price is required").notEmpty(),
    body("image", "image is required").notEmpty(),
  ],
  fetchUser,
  CheckAdmin,
  addItem
);

menuRoutes.post(
  "/menu/updateitem/:id",
  fetchUser,
  CheckAdmin,
  updateItem
);

menuRoutes.post(
    "/menu/deleteitem/:id",
    fetchUser,
    CheckAdmin,
    deleteItem
  );

  menuRoutes.get(
    "/menu/getitems/",
    fetchUser,
    getItems
  );

export default menuRoutes;
