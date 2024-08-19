// Multiple Image
// Reviews
// Stock

import { addToCartAction } from '../redux/actions/cartActions';
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import axios from '../Axios';
import '../css/Product.css'
import React from 'react'

const Product = () => {

    const { userInfo } = useSelector(state => state.signIn) || {};
    const { products } = useSelector((state) => state.products);

    const dispatch = useDispatch();

    const [sizeButton, setSizeButton] = React.useState([true, false, false, false]);
    const [productsData, setProductsData] = React.useState([]);
    const [quantity, setQuantity] = React.useState(1);
    const [size, setSize] = React.useState('XS');

    function error(message = "Some error occured") {
        toast.error(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const updateCart = async () => {
        if (productsData.sellerId === userInfo.id) {
            error("You can't add your own product to cart");
            return;
        }
        const resp = await dispatch(addToCartAction(productsData, quantity, size));
        if (resp) {
            toast.success("Added to cart", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else {
            error();
        }
    };

    React.useEffect(() => {
        const id = window.location.pathname.split("/")[2];
        const fetchProductsData = async () => {
            const { data } = await axios.get("/API/Products/" + id);
            if (data.error) {
                error();
            }
            else {
                setProductsData(data);
            }

        };

        const product = products.find((item) => item._id === id);
        if (!product) {
            fetchProductsData();
        }
        else {
            setProductsData(product);
        }
    }, []);

    return (
        <div className='product' style={{ display: "flex" }}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img src={productsData.image} style={{ width: "450px", height: "450px", padding: "40px 50px" }} alt="product" />
            </div>
            <div className='productDetails' style={{ padding: "40px 0px" }}>
                <div style={{ marginTop: "20px", fontSize: "12px", color: "#888" }}>Home {">"} {productsData.category}</div>
                <div style={{ margin: "20px 0px 10px 0px", fontSize: "21px", textTransform: "capitalize", fontWeight: 500 }}>{productsData.name}</div>
                <hr style={{ width: "83.33%", border: "0.1px solid #ddd" }} />
                <div style={{ margin: "10px 0px", }}>
                    <span style={{ fontWeight: 500, fontSize: "18px" }}>MRP: ${productsData.price}.00</span>
                </div>
                <div style={{ textTransform: 'uppercase', color: '#888', margin: '20px 0px 0px 0px', lineHeight: '14px', fontSize: "14px" }}>
                    SIZE:<span style={{ color: '#000', marginLeft: '5px' }}>{size}</span>
                </div>
                <div className='productSize'>
                    <ul>
                        <li className={sizeButton[0] ? 'active' : ''} onClick={
                            () => {
                                setSize('XS')
                                setSizeButton([true, false, false, false])
                            }
                        }>xs</li>
                        <li className={sizeButton[1] ? 'active' : ''} onClick={
                            () => {
                                setSize('S')
                                setSizeButton([false, true, false, false])
                            }
                        }>s</li>
                        <li className={sizeButton[2] ? 'active' : ''} onClick={
                            () => {
                                setSize('M')
                                setSizeButton([false, false, true, false])
                            }
                        }>m</li>
                        <li className={sizeButton[3] ? 'active' : ''} onClick={
                            () => {
                                setSize('L')
                                setSizeButton([false, false, false, true])
                            }
                        }>l</li>
                    </ul>
                </div>
                <div style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                    <div style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', marginRight: '8px' }}>
                        Quantity
                    </div>
                </div>
                <div style={{ width: "13%" }}>
                    <select value={quantity} onChange={(e) => setQuantity(e.target.value)} style={{ width: "100%", height: "30px", border: "1px solid #ccc", borderRadius: "5px", marginRight: "0.5rem" }}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                    </select>
                </div>
                <hr style={{ width: "83.33%", border: "0.1px solid #ddd", margin: "25px 0px" }} />
                <button style={{ backgroundColor: "#ea6852", color: "#fff", borderRadius: "100px", border: "none", boxShadow: "0 2px 4px rgba(0, 0, 0, .161)", fontSize: "14px", height: "45px", padding: "14px 20px 13px", width: "83.33%", textTransform: "uppercase", }} onClick={updateCart}>Add to Cart</button>
                <hr style={{ width: "83.33%", border: "0.1px solid #ddd", margin: "25px 0px" }} />
                <div style={{ marginTop: "20px", fontSize: "16px", textTransform: "uppercase", fontWeight: 600 }}>Product Description</div>
                <div className='productDescription' style={{ marginTop: "10px", fontSize: "14px", width: '83.33%', textAlign: "justify", lineHeight: "1.86" }}>{productsData.description}</div>
            </div>
        </div>
    )
}

export default Product
