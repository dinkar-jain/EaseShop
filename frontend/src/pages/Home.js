import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import axios from "../Axios";
import React from 'react';

const Home = () => {

    const [items, setItems] = React.useState([])

    React.useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get('/API/Products');
            setItems(response.data.slice(0, 8));
        }
        fetchProducts();
    }, []);

    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", backgroundImage: "url(img/banner/slideshow-1.jpg)", backgroundRepeat: "no-repeat", width: "100%", height: "90vh", backgroundSize: "cover", backgroundPosition: "top right 50%" }}>
                <div style={{ paddingLeft: "8vw" }}>
                    <div style={{ fontSize: "4vw", fontFamily: "Spartan, sans-serif" }}>Super value deals</div>
                    <div style={{ fontSize: "4vw", fontFamily: "Spartan, sans-serif", color: "#088178" }}>On all products</div>
                    <div style={{ fontSize: "1.5vw", fontFamily: "Spartan, sans-serif", color: "rgb(99 98 98)", marginTop: "0.5rem", marginBottom: "25px" }}>Save more with coupons & up to 70% off!</div>
                    <Link to="/products" style={{ textDecoration: "none", fontFamily: "Spartan, sans-serif", backgroundImage: "url(img/button.png)", backgroundColor: "transparent", backgroundRepeat: "no-repeat", backgroundSize: "contain", color: "#088178", padding: "1vw 5vw" }}>Shop Now</Link>
                </div>
            </div>
            <div>
                <div style={{ fontSize: "4vw", fontFamily: "Spartan, sans-serif", textAlign: "center", marginTop: "3rem" }}>Featured Products</div>
                <div style={{ textAlign: "center", fontSize: "1.3vw", fontFamily: "Spartan, sans-serif", color: "rgb(99 98 98)", marginTop: "0.5rem" }}>Summer Collection New Modern Design</div>
                <div style={{ display: "flex", justifyContent: "space-evenly", marginTop: "2vw", flexWrap: "wrap" }}>
                    {items.map((item, index) => {
                        return (
                            <Link key={item._id} to={"/product/" + item._id} className='featuredProducts' style={{ textDecoration: "none", width: "20%", minWidth: "250px", padding: "10px 12px", border: "1px solid #cce7d0", borderRadius: "25px", cursor: "pointer", boxShadow: "20px 20px 30px rgba(0,0,0,0.02)", margin: "15px 0", transition: "0.2s ease" }}>
                                <img alt="" style={{ width: "100%", borderRadius: "20px" }} src={item.image}></img>
                                <div style={{ paddingTop: "12px", color: "#1a1a1a", fontSize: "14px", fontWeight: 600 }}>{item.name}</div>
                                <div style={{ display: "flex" }}>
                                    <div>
                                        <i style={{ fontSize: "12px", color: "rgb(243,181,25)" }} className='fas fa-star'></i>
                                        <i style={{ fontSize: "12px", color: "rgb(243,181,25)" }} className='fas fa-star'></i>
                                        <i style={{ fontSize: "12px", color: "rgb(243,181,25)" }} className='fas fa-star'></i>
                                        <i style={{ fontSize: "12px", color: "rgb(243,181,25)" }} className='fas fa-star'></i>
                                        <i style={{ fontSize: "12px", color: "rgb(243,181,25)" }} className='fas fa-star'></i>
                                        <div style={{ paddingTop: "2px", fontSize: "15px", fontWeight: 700, color: "#088178" }}>${item.price}</div>
                                    </div>
                                    <div style={{ marginLeft: "auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <i style={{ textAlign: "center", width: "40px", height: "40px", lineHeight: "40px", borderRadius: "50px", backgroundColor: "#e8f6ea", border: "1px solid #cce7d0", color: "#088178" }} className='fas fa-shopping-cart'></i>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
            <div className='actionBanner' style={{ marginTop: "40px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", backgroundImage: "url(/img/banner/b2.jpg)", width: "100%", height: "40vh", backgroundSize: "cover", backgroundPosition: "center" }}>
                <div style={{ color: "#fff", fontSize: "30px", paddingBottom: "20px" }}>Up to <span style={{ color: "#ef3636" }}>70% Off</span> - All t-Shirts & Accessories</div>
                <Link to="products" style={{ textDecoration: "none", fontSize: "14px", fontWeight: 600, padding: "15px 30px", color: "#000", backgroundColor: "#fff", borderRadius: "4px", transition: "0.2s" }}>Explore More</Link>
            </div>
            <div style={{ margin: "40px 0px", display: "flex", justifyContent: "space-evenly", flexWrap: "wrap" }}>
                <div className='actionBanner' style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "30px", backgroundImage: "url(/img/banner/b17.jpg)", width: "40%", height: "50vh", backgroundSize: "cover", backgroundPosition: "center" }}>
                    <div style={{ color: "white", fontSize: "20px", fontWeight: 300 }}>crazy deals</div>
                    <div style={{ color: "white", fontSize: "28px", fontWeight: 800 }}>buy 1 get 1 free</div>
                    <div style={{ color: "white", fontSize: "14px", fontWeight: 500, paddingBottom: "15px" }}>The best classic dress is on sale</div>
                    <Link to="products" style={{ textDecoration: "none", width: "20%", textAlign: "center", fontSize: "13px", fontWeight: 600, padding: "11px 18px", color: "#fff", backgroundColor: "transparent", border: "1px solid white", outline: "none", transition: "0.2s" }}>Learn More</Link>
                </div>
                <div className='actionBanner' style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "30px", backgroundImage: "url(/img/banner/b10.jpg)", width: "40%", height: "50vh", backgroundSize: "cover", backgroundPosition: "center" }}>
                    <div style={{ color: "white", fontSize: "20px", fontWeight: 300 }}>spring/summer</div>
                    <div style={{ color: "white", fontSize: "28px", fontWeight: 800 }}>upcoming season</div>
                    <div style={{ color: "white", fontSize: "14px", fontWeight: 500, paddingBottom: "15px" }}>Start preparing for what is about to come</div>
                    <Link to="products" style={{ textDecoration: "none", width: "20%", textAlign: "center", fontSize: "13px", fontWeight: 600, padding: "11px 18px", color: "#fff", backgroundColor: "transparent", border: "1px solid white", outline: "none", transition: "0.2s" }}>Collection</Link>
                </div>
            </div>
            <div style={{ marginTop: "40px", display: "flex", justifyContent: "space-evenly", flexWrap: "wrap" }}>
                <div className='textBanner' style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "20px", marginBottom: "20px", backgroundImage: "url(/img/banner/b7.jpg)", width: "25%", height: "30vh", backgroundSize: "cover", backgroundPosition: "center" }}>
                    <div style={{ color: "white", fontSize: "22px", fontWeight: 900 }}>SEASONAL SALE</div>
                    <div style={{ color: "#ec544e", fontSize: "15px", fontWeight: 800 }}>Winter Collection -50% Off</div>
                </div>
                <div className='textBanner' style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "20px", marginBottom: "20px", backgroundImage: "url(/img/banner/b4.jpg)", width: "25%", height: "30vh", backgroundSize: "cover", backgroundPosition: "center" }}>
                    <div style={{ color: "white", fontSize: "22px", fontWeight: 900 }}>NEW FOOTWEAR COLLECTION</div>
                    <div style={{ color: "#ec544e", fontSize: "15px", fontWeight: 800 }}>Spring/Summer 2022</div>
                </div>
                <div className='textBanner' style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "20px", marginBottom: "20px", backgroundImage: "url(/img/banner/b18.jpg)", width: "25%", height: "30vh", backgroundSize: "cover", backgroundPosition: "center" }}>
                    <div style={{ color: "white", fontSize: "22px", fontWeight: 900 }}>T-SHIRTS</div>
                    <div style={{ color: "#ec544e", fontSize: "15px", fontWeight: 800 }}>New Trendy Prints</div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home
