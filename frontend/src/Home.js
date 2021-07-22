import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductsDataAction } from "./Action";
import { Link } from "react-router-dom";

const Home = () => {

    const { ProductsData } = useSelector(state => state.AdminProduct);
    const Products = ProductsData;
    const Dispatch = useDispatch();

    const n = 3;
    var i = 0;

    useEffect(() => {

        Dispatch(ProductsDataAction());

        return () => {
            //
        }
    }, [Dispatch])

    const DisplayProducts = (_id, Category, n = 4, i = 0) => {
        return (
            <>
                <span style={{ textTransform: "uppercase", fontWeight: 700, fontSize: "30px", margin: "auto", display: "table", color: "dimgrey" }}>{Category}'s dress</span>
                <div className="MainPage-Container">
                    {Products.map(Product => {
                        if (Product._id === _id) {
                            return (
                                <div className="block-1" key={Product._id}>
                                    <Link to={'/Products/' + Product._id}><img src={Product.Image} alt="" /></Link> <br />
                                    <Link to={'/Products/' + Product._id}><b>{Product.Name}</b></Link>
                                </div>)
                        }
                        return null;
                    })}

                    <div className="block-2-Main">
                        {Products.map(Product => {
                            if (Product.Category === Category && Product._id !== _id && i++ < n) {
                                return (
                                    <div className="block-2" key={Product._id}>
                                        <Link to={'/Products/' + Product._id}><img src={Product.Image} alt="" /></Link> <br />
                                        <Link to={'/Products/' + Product._id}>{Product.Name}</Link>
                                    </div>
                                )
                            }
                            return null;
                        })}
                    </div>
                </div>

                <div className="MoreBox">
                    <Link to="/Products" style={{ textDecoration: "none" }}><span style={{ border: "3px solid rgb(180, 69, 69)", borderRadius: "10px", padding: "1% 2%", backgroundColor: "rgb(177, 84, 84)" }}>
                        <span style={{ fontWeight: 700, fontSize: "20px", color: "white", textTransform: "uppercase" }}>more</span>
                        <span style={{ color: "white", fontSize: "20px" }}>&#8680;</span></span></Link>
                </div>
            </>
        )
    }

    if (Products !== undefined) {

        return (
            <>
                <img src="https://chishti-kit.com/wp-content/uploads/2017/12/Fashion-Clothing.jpg?w=640" alt="" style={{ width: "100%" }} /><br /><br /><br /><br />
                {DisplayProducts("60f819dee3e8252120fd11ad", "MEN")}
                {DisplayProducts("60f81a26e3e8252120fd11ae", "WOMEN")}
                <div style={{ backgroundImage: 'url(https://www.familyeducation.com/sites/default/files/styles/large/public/2018-12/10-holiday-inspired-baby-names_feature.jpg?itok=ZwX0f4Ju)', backgroundSize: "cover", backgroundAttachment: "fixed" }}>
                    <div className="MainPage-Container">
                        <div className="block-3-Main">
                            {Products.map(Product => {
                                if (Product.Category === "CHILDREN" && i++ < n) {
                                    return (
                                        <div className="block-3" key={Product._id}>
                                            <Link to={'/Products/' + Product._id}><img src={Product.Image} alt="" /></Link> <br />
                                            <Link to={'/Products/' + Product._id}><b>{Product.Name.substr(0, 14) + "..."}</b></Link>
                                        </div>
                                    )
                                }
                                return null;
                            })}
                        </div>
                    </div>
                    <br /><br /><br />
                    <div className="MoreBox" style={{ paddingTop: "0rem" }}>
                        <Link to="/Products" style={{ textDecoration: "none" }}><span style={{ border: "3px solid rgb(180, 69, 69)", borderRadius: "10px", padding: "1% 2%", backgroundColor: "rgb(177, 84, 84)" }}>
                            <span style={{ fontWeight: 700, fontSize: "20px", color: "white", textTransform: "uppercase" }}>more</span>
                            <span style={{ color: "white", fontSize: "20px" }}>&#8680;</span></span></Link>
                    </div>
                </div>
            </>
        )
    }

    else {
        Dispatch(ProductsDataAction());
        return null;
    }
}

export default Home