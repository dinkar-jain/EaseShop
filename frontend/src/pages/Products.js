import { fetchProductsAction } from "../redux/actions/productsAction";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import React from 'react'

const Products = () => {

    const dispatch = useDispatch();

    const products = useSelector((state) => state.products.products);

    const [dropdown, setDropdown] = React.useState(false);
    const [items, setItems] = React.useState(products);
    const [itemOffset, setItemOffset] = React.useState(0);

    let btnRef = React.useRef(null);

    let itemsPerPage = 12;
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = items.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items.length / itemsPerPage);
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
    };

    React.useEffect(() => {
        const closeDropdown = (event) => {
            if (!btnRef.current.contains(event.target)) {
                setDropdown(false);
            }
        }
        if (products.length === 0) {
            dispatch(fetchProductsAction());
        }
        document.addEventListener('click', closeDropdown);
        return () => { document.removeEventListener('click', closeDropdown) }
    }, []);

    React.useEffect(() => {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    }, [handlePageClick]);

    return (
        <div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "250px", width: "100%", backgroundImage: `url(img/banner/b1.jpg)` }}>
                <div style={{ color: "#fff", fontSize: "50px", fontWeight: 700 }} >#stayhome</div>
                <div style={{ color: "#fff", fontSize: "18px", fontWeight: 300 }} >Save more with coupons & up to 70% off!</div>
            </div>
            <div style={{ display: "flex", justifyContent: "right", marginTop: "50px", marginRight: "50px", gap: "15px" }}>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "20px", fontWeight: 500 }}>Sort by:</div>
                <div>
                    <div ref={btnRef} onClick={() => setDropdown(!dropdown)} style={{ border: "1px solid #7c7373", cursor: "pointer", width: "150px", height: "48px", borderRadius: "15px", backgroundColor: "rgb(250, 250, 250)", boxShadow: "2px 4px 8px #c5c5c5", display: "flex", alignItems: "center" }}>
                        <span style={{ marginLeft: "5px", fontSize: "14px", fontWeight: 400 }}>Price: Low to High</span>
                        <div style={{ marginLeft: "auto", marginRight: "5px" }}><i className="fa-solid fa-chevron-down"></i></div>
                    </div>
                    <ul className='filterDropdown' style={{ zIndex: 100, listStyle: "none", position: "absolute", marginTop: "5px", marginLeft: "5px", width: "150px", height: "auto", backgroundColor: "rgb(250, 250, 250)", boxShadow: "2px 4px 8px #c5c5c5", borderRadius: "15px", padding: "0px", display: dropdown ? "block" : "none" }}>
                        <li onClick={() => {
                            items.sort((a, b) => a.price - b.price);
                            setItems([...items]);
                        }} style={{ padding: "10px", cursor: "pointer" }}>Price: Low to High</li>
                        <li onClick={() => {
                            items.sort((a, b) => b.price - a.price);
                            setItems([...items]);
                        }} style={{ padding: "10px", cursor: "pointer" }}>Price: High to Low</li>
                    </ul>
                </div>
            </div>
            <div style={{ marginTop: "30px" }}>
                <div style={{ display: "flex", justifyContent: "space-evenly", marginTop: "2vw", flexWrap: "wrap" }}>
                    {currentItems.map((item, index) => {
                        return (
                            <Link key={item._id} to={"/product/" + item._id} className='featuredProducts' style={{ textDecoration: "none", width: "20%", minWidth: "250px", padding: "10px 12px", border: "1px solid #cce7d0", borderRadius: "25px", cursor: "pointer", boxShadow: "20px 20px 30px rgba(0,0,0,0.02)", margin: "15px 0", transition: "0.2s ease" }}>
                                <img alt='' style={{ width: "100%", borderRadius: "20px" }} src={item.image}></img>
                                <div style={{ paddingTop: "12px", color: "#1a1a1a", fontSize: "14px", fontWeight: 600 }}>{item.name}</div>
                                <div style={{ display: "flex" }}>
                                    <div>
                                        {
                                            Array(Math.floor(Math.random() * 2) + 3).fill().map((_, i) => {
                                                return (
                                                    <i key={i} style={{ color: "#f5c518" }} className="fa-solid fa-star"></i>
                                                )
                                            })
                                        }
                                        {
                                            Array(Math.round(Math.random())).fill().map((_, i) => {
                                                return (
                                                    <i key={i} style={{ color: "#f5c518" }} className="fa-solid fa-star-half"></i>
                                                )
                                            })
                                        }
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
            <ReactPaginate
                breakLabel="..."
                nextLabel={<i className="fa fa-angle-right"></i>}
                previousLabel={<i className="fa fa-angle-left"></i>}
                onPageChange={handlePageClick}
                pageCount={pageCount}
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                activeLinkClassName='activePaginationLink'
            />
        </div >
    )
}

export default Products
