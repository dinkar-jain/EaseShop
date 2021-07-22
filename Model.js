import Mongoose from "mongoose";

const UserSchema = new Mongoose.Schema({
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    PhoneNumber: { type: String, default: null },
    Address: { type: String, default: "" },
    City: { type: String },
    PostalCode: { type: String },
    Country: { type: String },
    Email: { type: String, required: true, unique: true, dropDups: true },
    Password: { type: String, required: true },
    IsAdmin: { type: Boolean, required: true, default: false }
});

const UsersModel = Mongoose.model("Users", UserSchema);
const Users = UsersModel

const ProductSchema = new Mongoose.Schema({
    Seller_id: { type: String, required: true },
    Seller_name: { type: String, required: true },
    Category: { type: String, required: true },
    Image: { type: String, required: true },
    Name: { type: String, required: true },
    Size: { type: String, required: true },
    Price: { type: Number, default: 0, required: true },
    Stock: { type: Number, default: 0, required: true },
    Description: { type: String, required: true },
});

const ProductsModel = Mongoose.model("Product", ProductSchema);
const Product = ProductsModel

const OrderSchema = new Mongoose.Schema({
    Date: { type: String, required: true },
    User_id: { type: String, required: true },
    Name: { type: String, required: true },
    Address: { type: String, required: true },
    Paid: { type: String, required: true, default: "No" },
    Delivered: { type: String, required: true, default: "No" },
    Details: []
});

const OrdersModel = Mongoose.model("Order", OrderSchema);
const Order = OrdersModel

export { Users, Product, Order }