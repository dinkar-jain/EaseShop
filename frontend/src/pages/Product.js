// Multiple Image
// Reviews
// Stock

import { addToCartAction } from '../redux/actions/cartActions';
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import '../css/Product.css'
import React from 'react'
import axios from 'axios';

const Product = () => {

    const { userInfo } = useSelector(state => state.signIn) || {};

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
        fetchProductsData();
    }, []);

    return (
        <div className='product' style={{ display: "flex" }}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img src={productsData.image} style={{ width: "450px", height: "450px", padding: "40px 50px" }} alt="product" />
            </div>
            <div className='productDetails' style={{ padding: "40px 0px" }}>
                <div style={{ marginTop: "20px", fontSize: "13px" }}><b>Home/{productsData.category}</b></div>
                <div style={{ marginTop: "20px", fontSize: "30px", }}><b>{productsData.name}</b></div>
                <div style={{ marginTop: "20px", fontSize: "20px", }}><b>${productsData.price}.00</b></div>
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
                <div className='productQuantity'>
                    <button onClick={() => {
                        if (quantity > 1) {
                            setQuantity(quantity - 1)
                        }
                    }}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => {
                        if (quantity < 3) {
                            setQuantity(quantity + 1)
                        }
                    }}>+</button>
                    <div className='productAddToCart'>
                        <button onClick={updateCart}>Add to Cart</button>
                    </div>
                </div>
                <div style={{ marginTop: "20px", fontSize: "20px" }}><b>Product Details</b></div>
                <div className='productDescription' style={{ marginTop: "20px", fontSize: "15px", width: '80%', textAlign: "justify" }}>{productsData.description}</div>
            </div>
        </div>
    )
}

export default Product
