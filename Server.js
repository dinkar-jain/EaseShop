import Express from "express";
import dotenv from "dotenv";
import Mongoose from "mongoose";
import { Users, Product, Order } from "./Model";
import { getToken, getSignOutToken, IsAdmin, IsAuth } from "./Middleware";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;
Mongoose.connect(MONGODB_URL, {

    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true

}).catch(error => console.log(error.reason));

const App = Express();
App.use(bodyParser.json())

App.post("/API/Users/SignUp", async (req, res) => {
    try {
        const id1 = String(req.body.Email.includes("@"));
        const id2 = String(req.body.Email.includes("."));
        const SameEmailUser = await Users.findOne({ Email: req.body.Email });

        if (req.body.FirstName === "" || req.body.LastName === "" || req.body.Password === "" || req.body.Email === "" || req.body.ReConfirm === "") {
            res.send('Fill All Fields')
        }

        else if (id1 !== "true" || id2 !== "true") {
            res.send("Enter Valid E-mail Id!");
        }

        else if (req.body.Password !== req.body.ReConfirm) {
            res.send("Check Confirm Password!")
        }

        else if (SameEmailUser) {
            res.send('Already Registered')
        }

        else {
            const User = new Users({
                FirstName: req.body.FirstName,
                LastName: req.body.LastName,
                Email: req.body.Email,
                Password: bcrypt.hashSync(req.body.Password, 10),
                IsAdmin: req.body.IsAdmin
            });

            const NewUser = await User.save();

            if (NewUser) {
                res.send(NewUser);
            }

            else {
                res.send('Please Try Again')
            }
        }

    } catch (error) {
        res.send(error);
    }
});

App.post("/API/Users/SignIn", async (req, res) => {
    try {
        const id1 = String(req.body.Email.includes("@"));
        const id2 = String(req.body.Email.includes("."));
        const SignInUser = await Users.findOne({
            Email: req.body.Email,
        });

        if (req.body.Password === "" || req.body.Email == "") {
            res.send('Fill All Fields')
        }

        else if (id1 !== "true" || id2 !== "true") {
            res.send("Enter Valid E-mail Id!");
        }

        else if (SignInUser && bcrypt.compareSync(req.body.Password, SignInUser.Password)) {
            res.send({
                _id: SignInUser._id,
                FirstName: SignInUser.FirstName,
                LastName: SignInUser.LastName,
                PhoneNumber: SignInUser.PhoneNumber,
                Address: SignInUser.Address,
                City: SignInUser.City,
                PostalCode: SignInUser.PostalCode,
                Country: SignInUser.Country,
                IsAdmin: SignInUser.IsAdmin,
                Token: getToken(SignInUser)
            })
        }

        else {
            res.send('Invalid Email Or Password')
        }

    } catch (error) {
        res.send(error);
    }
});

App.post("/API/Users/SignOut", async (req, res) => {
    try {
        const SignOutUser = Users.updateOne({ Email: req.body.Email }, { Token: getSignOutToken(SignOutUser) })
        res.send(SignOutUser)
    } catch (error) {
        res.send(error);
    }
});

App.post("/API/Users/UpdateProfile", async (req, res) => {
    try {
        if (req.body.FirstName === "" || req.body.LastName === "" || req.body.PhoneNumber === "" || req.body.Address === "" || req.body.City === "" || req.body.PostalCode === "" || req.body.Country === "") {
            res.send("Fill All Fields")
        }

        else if (req.body.PhoneNumber.length !== 10) {
            res.send("ReCheck Your Phone Number")
        }

        else {

            await Users.findByIdAndUpdate(req.body._id, {
                $set: {
                    FirstName: req.body.FirstName,
                    LastName: req.body.LastName,
                    PhoneNumber: req.body.PhoneNumber,
                    Address: req.body.Address,
                    City: req.body.City,
                    PostalCode: req.body.PostalCode,
                    Country: req.body.Country
                }
            });
            const UpdateUser = await Users.findOne({ _id: req.body._id });
            res.send({
                _id: UpdateUser._id,
                FirstName: UpdateUser.FirstName,
                LastName: UpdateUser.LastName,
                PhoneNumber: UpdateUser.PhoneNumber,
                Address: UpdateUser.Address,
                City: UpdateUser.City,
                PostalCode: UpdateUser.PostalCode,
                Country: UpdateUser.Country,
                IsAdmin: UpdateUser.IsAdmin,
                Token: getToken(UpdateUser)
            });
        }
    }
    catch (error) {
        res.send(error)
    }
});

App.post("/API/Users/UpdatePassword", async (req, res) => {
    try {
        const User = await Users.findOne({ _id: req.body._id })
        if (req.body.OldPassword === "" || req.body.NewPassword === "" || req.body.ReConfirmPassword === "") {
            res.send("Fill All Fields")
        }

        else if (req.body.NewPassword !== req.body.ReConfirmPassword) {
            res.send("ReConfirm Password Doesn't Match")
        }

        else if (bcrypt.compareSync(req.body.OldPassword, User.Password)) {
            await Users.findByIdAndUpdate(req.body._id, {
                $set: {
                    Password: bcrypt.hashSync(req.body.NewPassword, 10)
                }
            });
            res.send("Password Updated");
        }

        else {
            res.send("Old Password Incorrect")
        }
    }
    catch (error) {
        res.send(error)
    }
});

App.post("/API/Products/Create", IsAuth, IsAdmin, async (req, res) => {
    try {
        if (req.body.Image === "" || req.body.Name === "" || req.body.Price === "" || req.body.Stock === "") {
            res.send("Fill All Fields")
        }

        else if (isNaN(req.body.Price) || req.body.Price < 0) {
            res.send("Invalid Price Input")
        }

        else if (isNaN(req.body.Stock || req.body.Stock < 0)) {
            res.send("Invalid Stock Input")
        }

        else {
            const Products = new Product({
                Seller_id: req.body.Seller_id,
                Seller_name: req.body.Seller_name,
                Category: req.body.Category,
                Image: req.body.Image,
                Name: req.body.Name,
                Size: req.body.Size,
                Price: req.body.Price,
                Stock: req.body.Stock,
                Description: req.body.Description
            });

            const NewProduct = await Products.save();
            res.send(NewProduct);
        }

    } catch (error) {
        return res.send(error);
    }

});

App.get("/API/Products", async (req, res) => {
    try {
        const Products = await Product.find({});
        res.send(Products);
    } catch (error) {
        res.send(error)
    }
});

App.get("/API/Products/:_id", async (req, res) => {
    try {
        const SearchProduct = await Product.findOne({ _id: req.params._id });
        res.send(SearchProduct);
    } catch (error) {
        res.send(error)
    }

});

App.post("/API/Products/Update/:_id", IsAuth, IsAdmin, async (req, res) => {
    try {
        if (req.body.Image === "" || req.body.Name === "" || req.body.Price === "" || req.body.Stock === "") {
            res.send("Fill All Fields")
        }

        else if (isNaN(req.body.Price) || req.body.Price < 0) {
            res.send("Invalid Price Input")
        }

        else if (isNaN(req.body.Stock || req.body.Stock < 0)) {
            res.send("Invalid Stock Input")
        }

        else {
            const _id = req.params._id;
            await Product.findByIdAndUpdate(_id, {
                $set: {
                    Category: String(req.body.Category),
                    Image: String(req.body.Image),
                    Name: String(req.body.Name),
                    Size: String(req.body.Size),
                    Price: req.body.Price,
                    Stock: req.body.Stock,
                    Description: req.body.Description
                }
            });
            res.send("Product Updated")
        }
    } catch (error) {
        res.send(error)
    }
});

App.get("/API/Products/Delete/:_id", IsAuth, IsAdmin, async (req, res) => {
    try {
        const DeleteProduct = await Product.findOne({ _id: req.params._id });
        await DeleteProduct.remove()
    } catch (error) {
        res.send(error)
    }
});

App.post("/API/Orders", IsAuth, async (req, res) => {
    try {
        const Orders = await Order.find({ User_id: req.body.User_id });
        res.send(Orders);
    } catch (error) {
        res.send(error)
    }
});

App.post("/API/Orders/Create", IsAuth, async (req, res) => {
    try {
        const Orders = new Order({
            Date: req.body.Date,
            User_id: req.body.User_id,
            Name: req.body.Name,
            Address: req.body.Address,
            Details: req.body.Products
        })

        await Orders.save();

    } catch (error) {
        return res.send(error);
    }

});

App.post("/API/Orders/Dispatch", IsAuth, IsAdmin, async (req, res) => {
    try {
        await Order.findByIdAndUpdate(req.body._id, {
            $set: {
                Delivered: "Yes"
            }
        }
        );
    }

    catch (error) {
        return res.send(error);
    }

});

App.post("/API/Orders/Delete", IsAuth, async (req, res) => {
    try {
        const DeleteOrder = await Order.findOne({ _id: req.body.Order_id });
        await DeleteOrder.remove()
    } catch (error) {
        res.send(error)
    }
});

App.get("/API/Sales", IsAuth, async (req, res) => {
    try {
        const Orders = await Order.find();
        res.send(Orders);
    } catch (error) {
        res.send(error)
    }
}),
    App.listen(process.env.PORT || 5000)