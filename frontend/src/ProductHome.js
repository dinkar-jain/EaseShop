import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ProductsDataAction } from "./Action";
import ErrorPage from "./ErrorPage";

const ProductHome = () => {

    const { ProductsData } = useSelector(state => state.AdminProduct);
    const [Size, SetSize] = useState();
    const [LPrice, SetLPrice] = useState(100);
    const [HPrice, SetHPrice] = useState(999);
    const [Category, SetCategory] = useState();
    const [SearchText, SetSearchText] = useState();
    const Products = ProductsData;
    const Dispatch = useDispatch();

    const Reset = () => {
        window.location.reload(true);
    }

    useEffect(() => {

        Dispatch(ProductsDataAction());

        return () => {
            //
        }
    }, [Dispatch])

    try {

        if (Products) {

            return (
                <>
                    <div id="ProductsHome">
                        <div id="Filters">
                            <button style={{ cursor: "pointer", padding: "2px", outlineStyle: "none", backgroundColor: "#d4d1d1", borderRadius: "10px", borderColor: "#d4d1d1", width: "100%" }} onClick={Reset}><b>Reset Filters</b></button><br /><br /><br />
                            <span style={{ display: "flex" }}><input id="SearchBox" type="text" placeholder="Search.." /><button onClick={function () { SetSearchText(document.getElementById("SearchBox").value.charAt(0).toUpperCase() + document.getElementById("SearchBox").value.slice(1)) }}> <span role="img" aria-label="">&#128269;</span></button></span><br /><br /><br />
                            <p style={{ fontSize: "20px", textTransform: "uppercase", fontWeight: 600 }}>price</p><br />
                            <span style={{ textTransform: "uppercase", fontWeight: 700, fontSize: "15px", paddingLeft: "3%", }}><input type="radio" className="choice" name="price" onClick={function () { SetLPrice(100); SetHPrice(200) }} /> &nbsp;₹100-200</span><br />
                            <span style={{ textTransform: "uppercase", fontWeight: 700, fontSize: "15px", paddingLeft: "3%", }}><input type="radio" className="choice" name="price" onClick={function () { SetLPrice(200); SetHPrice(400) }} /> &nbsp;₹200-400</span><br />
                            <span style={{ textTransform: "uppercase", fontWeight: 700, fontSize: "15px", paddingLeft: "3%", }}><input type="radio" className="choice" name="price" onClick={function () { SetLPrice(400); SetHPrice(600) }} /> &nbsp;₹400-600</span><br />
                            <span style={{ textTransform: "uppercase", fontWeight: 700, fontSize: "15px", paddingLeft: "3%", }}><input type="radio" className="choice" name="price" onClick={function () { SetLPrice(600); SetHPrice(800) }} /> &nbsp;₹600-800</span><br />
                            <span style={{ textTransform: "uppercase", fontWeight: 700, fontSize: "15px", paddingLeft: "3%", }}><input type="radio" className="choice" name="price" onClick={function () { SetLPrice(800); SetHPrice(999) }} /> &nbsp;₹800-999</span><br />
                            <br /><br />
                            <p style={{ fontSize: "20px", textTransform: "uppercase", fontWeight: 600 }}>Size</p><br />
                            <span style={{ textTransform: "uppercase", fontWeight: 700, fontSize: "15px", paddingLeft: "3%", }}><input type="radio" className="choice" name="size" onClick={function () { SetSize("S") }} /> &nbsp;S</span><br />
                            <span style={{ textTransform: "uppercase", fontWeight: 700, fontSize: "15px", paddingLeft: "3%", }}><input type="radio" className="choice" name="size" onClick={function () { SetSize("M") }} /> &nbsp;M</span><br />
                            <span style={{ textTransform: "uppercase", fontWeight: 700, fontSize: "15px", paddingLeft: "3%", }}><input type="radio" className="choice" name="size" onClick={function () { SetSize("L") }} /> &nbsp;L</span><br />
                            <span style={{ textTransform: "uppercase", fontWeight: 700, fontSize: "15px", paddingLeft: "3%", }}><input type="radio" className="choice" name="size" onClick={function () { SetSize("XL") }} /> &nbsp;XL</span><br />
                            <br /> <br />
                            <p style={{ fontSize: "20px", textTransform: "uppercase", fontWeight: 600 }}>Category</p><br />
                            <span style={{ textTransform: "uppercase", fontWeight: 700, fontSize: "15px", paddingLeft: "3%", }}><input type="radio" className="choice" name="category" onClick={function () { SetCategory("MEN") }} /> &nbsp;MEN</span><br />
                            <span style={{ textTransform: "uppercase", fontWeight: 700, fontSize: "15px", paddingLeft: "3%", }}><input type="radio" className="choice" name="category" onClick={function () { SetCategory("WOMEN") }} /> &nbsp;WOMEN</span><br />
                            <span style={{ textTransform: "uppercase", fontWeight: 700, fontSize: "15px", paddingLeft: "3%", }}><input type="radio" className="choice" name="category" onClick={function () { SetCategory("CHILDREN") }} /> &nbsp;CHILDREN</span><br />
                            <br /> <br />
                        </div>
                        <div id="Home">
                            {Products.map(Product => {

                                if (LPrice <= Product.Price && HPrice >= Product.Price && Category === Product.Category && Size === Product.Size && (Product.Name.search(SearchText) !== -1 ? true : false)) {
                                    return (<div key={Product._id}>
                                        <Link to={'/Products/' + Product._id}><img src={Product.Image} alt=""></img></Link>
                                        <h2><Link to={'/Products/' + Product._id}>{Product.Name.substr(0, 14) + "..."}</Link></h2><br></br>
                                        <h3>₹{Product.Price}</h3><br></br>
                                    </div>)
                                }

                                else if (LPrice <= Product.Price && HPrice >= Product.Price && Category === Product.Category && Size === undefined && (Product.Name.search(SearchText) !== -1 ? true : false)) {
                                    return (<div key={Product._id}>
                                        <Link to={'/Products/' + Product._id}><img src={Product.Image} alt=""></img></Link>
                                        <h2><Link to={'/Products/' + Product._id}>{Product.Name.substr(0, 14) + "..."}</Link></h2><br></br>
                                        <h3>₹{Product.Price}</h3><br></br>
                                    </div>)
                                }

                                else if (LPrice <= Product.Price && HPrice >= Product.Price && Category === undefined && Size === Product.Size && (Product.Name.search(SearchText) !== -1 ? true : false)) {
                                    return (<div key={Product._id}>
                                        <Link to={'/Products/' + Product._id}><img src={Product.Image} alt=""></img></Link>
                                        <h2><Link to={'/Products/' + Product._id}>{Product.Name.substr(0, 14) + "..."}</Link></h2><br></br>
                                        <h3>₹{Product.Price}</h3><br></br>
                                    </div>)
                                }

                                else if (LPrice <= Product.Price && HPrice >= Product.Price && Category === undefined && Size === undefined && (Product.Name.search(SearchText) !== -1 ? true : false)) {
                                    return (<div key={Product._id}>
                                        <Link to={'/Products/' + Product._id}><img src={Product.Image} alt=""></img></Link>
                                        <h2><Link to={'/Products/' + Product._id}>{Product.Name.substr(0, 14) + "..."}</Link></h2><br></br>
                                        <h3>₹{Product.Price}</h3><br></br>
                                    </div>)
                                }

                                else {
                                    return null;
                                }
                            }
                            )}
                        </div>
                    </div>
                </>
            )
        }

        else {
            Dispatch(ProductsDataAction());
            return "";
        }

    } catch (error) {
        return <ErrorPage />
    }
}

export default ProductHome