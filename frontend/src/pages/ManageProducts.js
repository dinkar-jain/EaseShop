import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import { toast } from 'react-toastify';
import ErrorPage from "./ErrorPage";
import "../css/ManageProducts.css";
import axios from "axios";
import React from 'react'

const ManageProducts = () => {
    let { userInfo } = useSelector(state => state.signIn) || {};

    let btnRef = React.useRef(null);

    const [createProduct, setCreateProduct] = React.useState(false);
    const [deleteProducts, setDeleteProducts] = React.useState([]);
    const [editProduct, setEditProduct] = React.useState(false);
    const [productsData, setProductsData] = React.useState([]);
    const [description, setDescription] = React.useState("");
    const [dropdown, setDropdown] = React.useState(false);
    const [category, setCategory] = React.useState("");
    const [image, setImage] = React.useState(null);
    const [price, setPrice] = React.useState(null);
    const [name, setName] = React.useState("");
    const [id, setId] = React.useState("");

    function convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            if (file) {
                fileReader.readAsDataURL(file);
                fileReader.onload = () => {
                    resolve(fileReader.result)
                };
                fileReader.onerror = (error) => {
                    reject(error)
                }
            }
        })
    }

    function validateInput() {
        if (name === "" || category === "" || price === null || description === "" || image === "") {
            toast.error("Empty fields not allowed", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return false;
        }
        else if (isNaN(price)) {
            toast.error("Price should be a number", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return false;
        }
        else if (price < 0) {
            toast.error("Price should be greater than 0", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return false;
        }
        else {
            return true;
        }
    }

    function error() {
        toast.error("Some error occured", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        setCreateProduct(false);
    }

    function success(message) {
        toast.success(message, {
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

    const createProductHandler = async () => {
        if (!validateInput()) return;
        const { data } = await axios.post("/API/Products/Create", { category, image, name, price, description }, {
            headers: {
                'authorization': userInfo.token
            }
        });
        if (data.error) {
            error();
        }
        else {
            success(data.message);
        }
        setId("");
        setCategory("");
        setImage("");
        setName("");
        setPrice(null);
        setDescription("");
        setCreateProduct(false);
    };

    const editProductHandler = async () => {
        if (!validateInput()) return;
        const { data } = await axios.post("/API/Products/Update/" + id, { category, image, name, price, description }, {
            headers: {
                'authorization': userInfo.token
            }
        });
        if (data.error) {
            error();
        }
        else {
            success(data.message);
        }
        setId("");
        setCategory("");
        setImage("");
        setName("");
        setPrice(null);
        setDescription("");
        setEditProduct(false);
    };

    const deleteProductsHandler = async () => {
        const { data } = await axios.post("/API/Products/Delete", { deleteProducts }, {
            headers: {
                'authorization': userInfo.token
            }
        });
        if (data.error) {
            error();
        }
        else {
            success(data.message);
        }
        setDeleteProducts([]);
    };

    React.useEffect(() => {
        const closeDropdown = (event) => {
            try {
                if (!btnRef.current.contains(event.target)) {
                    setDropdown(false);
                }
            } catch (error) {
                console.log(error);
            }
        }
        document.addEventListener('click', closeDropdown);
        return () => { document.removeEventListener('click', closeDropdown) }
    }, []);

    React.useEffect(() => {
        let cancel = false;
        const fetchProductsData = async () => {
            const { data } = await axios.get("/API/sellerProducts", {
                headers: {
                    'authorization': userInfo.token
                }
            });
            if (data.error) {
                error();
            }
            else {
                if (!cancel)
                    setProductsData(data);
            }
        };
        fetchProductsData();
        return () => {
            cancel = true;
        }
    }, [createProductHandler, deleteProductsHandler]);

    return (
        <div>
            {
                userInfo && userInfo.isSeller ?
                    <div style={{ display: "flex" }}>
                        <Sidebar />
                        <div id="manage-products" style={{ background: "rgb(246, 247, 251)", width: "100%", padding: '30px 2vw', overflowX: "scroll" }}>
                            <div style={{ display: "flex" }}>
                                {createProduct || editProduct ?
                                    <h2 style={{ fontFamily: 'Roboto, sans-serif', verticalAlign: 'middle', fontSize: '32px', lineHeight: '40px', fontWeight: '300', marginBottom: "1.5rem" }}>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <span style={{ cursor: "pointer", fontFamily: 'Roboto, sans-serif', border: '1px solid rgb(66, 104, 246)', color: 'rgb(66, 104, 246)', boxSizing: 'border-box', borderRadius: '9999px', marginRight: '16px', marginTop: "6px", padding: '8px', lineHeight: '12px', minWidth: '34px', height: '34px' }} onClick={() => {
                                                setId("");
                                                setCategory("");
                                                setImage("");
                                                setName("");
                                                setPrice(null);
                                                setDescription("");
                                                setCreateProduct(false);
                                                setEditProduct(false);
                                            }}>
                                                <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M5 8L10 3 10.7 3.7 6.4 8 10.7 12.3 10 13z"></path></svg>
                                            </span>
                                            <div>{createProduct ? "Create new" : "Edit"}</div>
                                        </div>
                                    </h2>
                                    :
                                    <div>
                                        <div style={{ fontSize: '20px', margin: '0 0 5px', letterSpacing: '.025em' }}>Products</div>
                                        <div style={{ fontSize: '13px', display: "flex", marginBottom: "1rem" }}>
                                            <div style={{ color: "#37474f", marginRight: "12px" }}>Home</div>
                                            <div style={{ color: "#868e96", marginRight: "7px" }}>/</div>
                                            <div style={{ color: "#868e96" }}>Products</div>
                                        </div>
                                    </div>
                                }
                                {
                                    createProduct || editProduct ? null :
                                        <div style={{ marginLeft: "auto" }}>
                                            <div id="productsActions" style={{ display: "flex" }}>
                                                {
                                                    deleteProducts.length > 0 ?
                                                        <button onClick={deleteProductsHandler} style={{ background: "rgb(255, 69, 103)", color: "white", border: "1px solid rgb(221, 221, 221)", borderRadius: "4px", padding: "8px 16px", fontSize: "14px", fontWeight: "500", cursor: "pointer", marginLeft: "auto", marginRight: "5px", marginTop: "auto", marginBottom: "auto", display: "flex", alignItems: "center" }}>
                                                            <svg style={{ marginRight: "5px" }} focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="16" height="16" viewBox="0 0 32 32" aria-hidden="true"><path d="M12 12H14V24H12zM18 12H20V24H18z"></path><path d="M4 6V8H6V28a2 2 0 002 2H24a2 2 0 002-2V8h2V6zM8 28V8H24V28zM12 2H20V4H12z"></path></svg>
                                                            Delete
                                                        </button> : null
                                                }
                                                <button onClick={() => setCreateProduct(true)} style={{ background: "rgb(66, 104, 246)", color: "white", border: "1px solid rgb(221, 221, 221)", borderRadius: "4px", padding: "8px 16px", fontSize: "14px", fontWeight: "500", cursor: "pointer", marginLeft: "auto", marginRight: "0px", marginTop: "auto", marginBottom: "auto" }}>
                                                    + Create new
                                                </button>
                                            </div>
                                        </div>
                                }
                            </div>
                            <div style={{ background: 'rgb(255, 255, 255)', padding: '32px', overflowX: "scroll" }}>
                                {
                                    createProduct || editProduct ?
                                        <>
                                            <div style={{ marginBottom: '24px' }}>
                                                <div style={{ fontFamily: 'Roboto, sans-serif', lineHeight: '16px', fontSize: '14px', fontWeight: 'normal', marginBottom: '4px', color: 'rgb(137, 138, 154)' }}>
                                                    <span style={{ color: 'rgb(255, 0, 0)' }}>*</span> Name
                                                </div>
                                                <input onChange={(e) => setName(e.target.value)} value={name} style={{ boxSizing: "border-box", width: '100%', color: 'rgb(69, 70, 85)', border: '1px solid rgb(192, 192, 202)', fontSize: '14px', lineHeight: '24px', fontFamily: 'Roboto, sans-serif', padding: '4px 8px' }} />
                                            </div>
                                            <div style={{ marginBottom: '24px' }}>
                                                <div style={{ fontFamily: 'Roboto, sans-serif', lineHeight: '16px', fontSize: '14px', fontWeight: 'normal', marginBottom: '4px', color: 'rgb(137, 138, 154)' }}>
                                                    <span style={{ color: 'rgb(255, 0, 0)' }}>*</span> Category
                                                </div>
                                                <div ref={btnRef} onClick={() => setDropdown(!dropdown)} style={{ border: "1px solid rgb(192, 192, 202)", color: 'rgb(69, 70, 85)', cursor: "pointer", height: "33px", width: "100%", display: "flex", alignItems: "center" }}>
                                                    <div style={{ color: 'rgb(69, 70, 85)', fontSize: '14px', lineHeight: '24px', fontFamily: 'Roboto, sans-serif', padding: "4px 8px" }}>{category}</div>
                                                    <div style={{ marginLeft: "auto", marginRight: "5px", display: "flex", alignItems: "center" }}>
                                                        <svg onClick={() =>
                                                            setCategory("")
                                                        } xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                                        </svg>
                                                        <div style={{ width: "1px", height: "16px", background: "rgb(192, 192, 202)", margin: "0px 8px" }}></div>
                                                        <i className="fa-solid fa-chevron-down"></i>
                                                    </div>
                                                </div>
                                                <ul style={{ display: dropdown ? "block" : "none", listStyle: "none", padding: "0px", margin: "0px", marginTop: "5px", border: "1px solid rgb(192, 192, 202)", borderRadius: "4px", width: "100%" }}>
                                                    <li style={{ cursor: "pointer", padding: "8px 16px", color: 'rgb(69, 70, 85)', fontSize: '14px', lineHeight: '24px', fontFamily: 'Roboto, sans-serif' }} onClick={() => {
                                                        setCategory("Mens' Clothing"); setDropdown(false)
                                                    }}>
                                                        Mens' Clothing
                                                    </li>
                                                    <li style={{ cursor: "pointer", padding: "8px 16px", color: 'rgb(69, 70, 85)', fontSize: '14px', lineHeight: '24px', fontFamily: 'Roboto, sans-serif' }} onClick={() => {
                                                        setCategory("Womens' Clothing"); setDropdown(false)
                                                    }}>
                                                        Womens' Clothing
                                                    </li>
                                                </ul>
                                            </div>
                                            <div style={{ marginBottom: '24px' }}>
                                                <div style={{ fontFamily: 'Roboto, sans-serif', lineHeight: '16px', fontSize: '14px', fontWeight: 'normal', marginBottom: '4px', color: 'rgb(137, 138, 154)' }}>
                                                    <span style={{ color: 'rgb(255, 0, 0)' }}>*</span> Price
                                                </div>
                                                <input onChange={(e) => setPrice(e.target.value)} value={price} style={{ boxSizing: "border-box", width: '100%', color: 'rgb(69, 70, 85)', border: '1px solid rgb(192, 192, 202)', fontSize: '14px', lineHeight: '24px', fontFamily: 'Roboto, sans-serif', padding: '4px 8px' }} />
                                            </div>
                                            <div style={{ marginBottom: '24px' }}>
                                                <div style={{ fontFamily: 'Roboto, sans-serif', lineHeight: '16px', fontSize: '14px', fontWeight: 'normal', marginBottom: '4px', color: 'rgb(137, 138, 154)' }}>
                                                    <span style={{ color: 'rgb(255, 0, 0)' }}>*</span> Description
                                                </div>
                                                <textarea onChange={(e) => setDescription(e.target.value)} value={description} style={{ boxSizing: "border-box", width: '100%', color: 'rgb(69, 70, 85)', border: '1px solid rgb(192, 192, 202)', fontSize: '14px', lineHeight: '24px', fontFamily: 'Roboto, sans-serif', padding: '4px 8px' }} />
                                            </div>
                                            <div style={{ marginBottom: '24px' }}>
                                                <div style={{ fontFamily: 'Roboto, sans-serif', lineHeight: '16px', fontSize: '14px', fontWeight: 'normal', marginBottom: '4px', color: 'rgb(137, 138, 154)' }}>
                                                    <span style={{ color: 'rgb(255, 0, 0)' }}>*</span> Image
                                                </div>
                                                <div id="image" style={{ display: "flex", alignItems: "center" }}>
                                                    <div id="image-preview" style={{ border: "1px solid rgb(192, 192, 202)", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                        <img alt="" style={{ width: "100px", height: "100px" }} src={image} />
                                                    </div>
                                                    <div id="image-input" style={{ marginLeft: "16px" }}>
                                                        <input style={{ boxSizing: "border-box", width: '100%', height: "100%", color: 'rgb(69, 70, 85)', border: '1px solid rgb(192, 192, 202)', fontSize: '14px', lineHeight: '24px', fontFamily: 'Roboto, sans-serif', padding: '4px 8px', cursor: "pointer", background: "rgb(246, 247, 251)", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center" }} onChange={async (e) => {
                                                            setImage(await convertToBase64(e.target.files[0]))
                                                        }} type="file" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ marginBottom: '24px', display: "flex", justifyContent: "center" }}>
                                                <button style={{ cursor: "pointer", fontSize: '14px', fontFamily: 'Roboto, sans-serif', border: '1px solid transparent', backgroundColor: 'rgb(66, 104, 246)', color: 'rgb(255, 255, 255)', padding: '8px 48px', lineHeight: '24px' }} onClick={
                                                    () => {
                                                        if (createProduct) {
                                                            createProductHandler()
                                                        }
                                                        else {
                                                            editProductHandler()
                                                        }
                                                    }
                                                }>
                                                    {
                                                        createProduct ? "Create" : "Update"
                                                    }
                                                </button>
                                            </div>
                                        </>
                                        :
                                        <table style={{ width: '100%' }}>
                                            <thead style={{ background: 'rgb(246, 247, 251)' }}>
                                                <tr>
                                                    <th style={{ textAlign: 'left' }}><input disabled type="checkbox" /></th>
                                                    <th style={{ textAlign: 'left', color: "rgb(137, 138, 154)", fontSize: '12px', lineHeight: '16px', padding: '16px', fontWeight: 500 }}>Name</th>
                                                    <th style={{ textAlign: 'left', color: "rgb(137, 138, 154)", fontSize: '12px', lineHeight: '16px', padding: '16px', fontWeight: 500 }}>Id</th>
                                                    <th style={{ textAlign: 'left', color: "rgb(137, 138, 154)", fontSize: '12px', lineHeight: '16px', padding: '16px', fontWeight: 500 }}>Category</th>
                                                    <th style={{ textAlign: 'left', color: "rgb(137, 138, 154)", fontSize: '12px', lineHeight: '16px', padding: '16px', fontWeight: 500 }}>Price</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {productsData.map((product) => {
                                                    return (
                                                        <tr key={product._id}>
                                                            <td><input type="checkbox" onClick={() => {
                                                                if (deleteProducts.includes(product._id)) {
                                                                    setDeleteProducts(deleteProducts.filter((id) => id !== product._id))
                                                                }
                                                                else {
                                                                    setDeleteProducts([...deleteProducts, product._id])
                                                                }
                                                            }
                                                            } /></td>
                                                            <td onClick={() => {
                                                                setId(product._id)
                                                                setName(product.name)
                                                                setPrice(product.price)
                                                                setDescription(product.description)
                                                                setImage(product.image)
                                                                setCategory(product.category)
                                                                setEditProduct(true)
                                                            }
                                                            } style={{ textAlign: 'left', fontFamily: "Roboto, sans-serif", lineHeight: "16px", fontSize: "16px" }}>{product.name}</td>
                                                            <td onClick={() => {
                                                                setId(product._id)
                                                                setName(product.name)
                                                                setPrice(product.price)
                                                                setDescription(product.description)
                                                                setImage(product.image)
                                                                setCategory(product.category)
                                                                setEditProduct(true)
                                                            }
                                                            } style={{ textAlign: 'left', fontFamily: "Roboto, sans-serif", lineHeight: "16px", fontSize: "16px" }}>{product._id}</td>
                                                            <td onClick={() => {
                                                                setId(product._id)
                                                                setName(product.name)
                                                                setPrice(product.price)
                                                                setDescription(product.description)
                                                                setImage(product.image)
                                                                setCategory(product.category)
                                                                setEditProduct(true)
                                                            }
                                                            } style={{ textAlign: 'left', fontFamily: "Roboto, sans-serif", lineHeight: "16px", fontSize: "16px", color: "rgb(66, 104, 246)" }}>{product.category}</td>
                                                            <td onClick={() => {
                                                                setId(product._id)
                                                                setName(product.name)
                                                                setPrice(product.price)
                                                                setDescription(product.description)
                                                                setImage(product.image)
                                                                setCategory(product.category)
                                                                setEditProduct(true)
                                                            }
                                                            } style={{ textAlign: 'left', fontFamily: "Roboto, sans-serif", lineHeight: "16px", fontSize: "16px" }}>${product.price}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                }
                            </div>
                        </div>
                    </div>
                    :
                    <ErrorPage />

            }
        </div>
    )
}

export default ManageProducts
