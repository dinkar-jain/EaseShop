import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ProductCreateAction, ProductUpdateAction, ProductDeleteAction, ProductsDataAction } from "./Action";
import ErrorPage from "./ErrorPage";

const ManageProducts = () => {

    const { ProductsData } = useSelector(state => state.AdminProduct);
    const { error } = useSelector(state => state.AdminProduct)
    const Products = ProductsData;
    const { SignInDetails } = useSelector(state => state.SignIn);
    const Seller_id = SignInDetails._id;
    const Seller_name = SignInDetails.FirstName + " " + SignInDetails.LastName;

    const [Visibility, SetVisibility] = useState(false)
    const [_id, set_id] = useState()
    const [Category, SetCategory] = useState("MEN");
    const [Image, SetImage] = useState("");
    const [Name, SetName] = useState("");
    const [Size, SetSize] = useState("S");
    const [Price, SetPrice] = useState("");
    const [Stock, SetStock] = useState("");
    const [Description, SetDescription] = useState("");
    const Dispatch = useDispatch();

    useEffect(() => {

        Dispatch(ProductsDataAction());

        return () => {
            //
        }
    }, [Dispatch])

    const CreateSubmitHandler = () => {
        Dispatch(ProductCreateAction(Category, Image, Name, Size, Price, Stock, Description, Seller_id, Seller_name));
    }

    const UpdateSubmitHandler = (_id) => {
        Dispatch(ProductUpdateAction(_id, Category, Image, Name, Size, Price, Stock, Description))
    }

    const DeleteSubmitHandler = (Product_id) => {
        Dispatch(ProductDeleteAction(Product_id))
        window.location.reload(false);
    }

    const UpdateDefaultValues = (Product) => {
        SetVisibility(true)
        set_id(Product._id)
        SetCategory(Product.Category)
        SetImage(Product.Image)
        SetName(Product.Name)
        SetSize(Product.Size)
        SetPrice(Product.Price)
        SetStock(Product.Stock)
        SetDescription(Product.Description)
    }

    const DisplayMainPage = () => {
        SetCategory("")
        SetImage("")
        SetName("")
        SetSize("")
        SetPrice("")
        SetStock("")
        SetDescription("")
        SetVisibility(false)
    }

    const DisplayOtherPage = () => {
        SetVisibility(true)
    }

    try {

        if (Products && SignInDetails.IsAdmin) {
            return (
                <>
                    {Visibility ?
                        < div id="ProductCreate" >
                            <div id="ProductCreateMain">
                                <h1><b>{_id ? "Update Product" : "Create Product"}</b></h1><br />
                                {error}<br /><br />
                                <h4>Category</h4>
                                <select id="CategorySelect" onChange={(e) => { SetCategory(e.target.value) }} value={Category}>
                                    <option value="MEN">MEN</option>
                                    <option value="WOMEN">WOMEN</option>
                                    <option value="CHILDREN">CHILDREN</option>
                                </select><br /><br />
                                <h4>Image</h4>
                                <input onChange={(e) => SetImage(e.target.value)} value={Image}></input><br /><br />
                                <h4>Name</h4>
                                <input onChange={(e) => SetName(e.target.value)} value={Name}></input><br /><br />
                                <h4>Size</h4>
                                <select id="CategorySelect" onChange={(e) => { SetSize(e.target.value) }} value={Size}>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                </select><br /><br />
                                <h4>Price</h4>
                                <input onChange={(e) => SetPrice(e.target.value)} value={Price}></input><br /><br />
                                <h4>Stock</h4>
                                <input onChange={(e) => SetStock(e.target.value)} value={Stock}></input><br /><br />
                                <h4>Description</h4>
                                <textarea style={{ width: "100%", height: "70px" }} onChange={(e) => SetDescription(e.target.value)} value={Description}></textarea><br /><br />
                                {_id ? <><button id="SignUpMainCreateAccountButton" onClick={() => { UpdateSubmitHandler(_id) }}>Update</button><br /><br /></> : <><button id="SignUpMainCreateAccountButton" onClick={CreateSubmitHandler}>Create</button><br /><br /></>}
                                <button onClick={DisplayMainPage}>Back</button><br /><br />
                            </div>
                        </div > :
                        <div id="ManageProducts" style={{ overflowX: "auto" }}>
                            <div id="AddProduct">
                                <button onClick={function () { DisplayOtherPage() }}>Add New Product</button>
                            </div><hr />
                            <table>
                                <thead>
                                    <tr>
                                        <th>_id </th>
                                        <th id="ProductName">Name</th>
                                        <th>Stock</th>
                                        <th>Price</th>
                                        <th>Category</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Products.map(Product =>
                                        <tr key={Product._id}>
                                            {Seller_id === Product.Seller_id ?
                                                <>
                                                    <td>{Product._id}</td>
                                                    <td>{Product.Name}</td>
                                                    <td>{Product.Stock}</td>
                                                    <td>{Product.Price}</td>
                                                    <td>{Product.Category}</td>
                                                    <td>
                                                        <button onClick={function () { UpdateDefaultValues(Product) }}> Edit</button>
                                                        <button onClick={function () { DeleteSubmitHandler(Product._id) }}>Delete</button>
                                                    </td>
                                                </> : null}
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    }
                </>
            )
        }

        else if (SignInDetails.IsAdmin) {
            Dispatch(ProductsDataAction());
            return "";
        }

        else {
            return <ErrorPage />
        }

    } catch (error) {
        return <ErrorPage />
    }

}

export default ManageProducts