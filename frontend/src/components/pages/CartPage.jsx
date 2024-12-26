import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { updateQuantity, removeFromCart } from '../../slice/cartSlice';
import { useLocation } from 'react-router-dom';

function CartPage() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const cartTotal = Object.values(cartItems).reduce(
        (total, item) => total + (item.quantity * item.product.price || 0),
        0
      ).toFixed(2);
    const deliveryCharge = 0;

    useEffect(() => {
        console.log("cartTotal:", cartTotal); // Debugging
    }, [cartItems]);

    const location = useLocation();

    useEffect(() => {
        // Scroll to top whenever the route changes
        window.scrollTo(0, 0);
    }, [location]);


    // Handle increment
    const handleIncrement = (prodId) => {
        const currentQuantity = cartItems[prodId]?.quantity || 1;
        const newQuantity = currentQuantity + 1;
        dispatch(updateQuantity({ productId: prodId, quantity: newQuantity }));
    };

    // Handle decrement
    const handleDecrement = (prodId) => {
        const currentQuantity = cartItems[prodId]?.quantity || 1;
        const newQuantity = Math.max(currentQuantity - 1, 1);
        if (newQuantity > 0) {
            dispatch(updateQuantity({ productId: prodId, quantity: newQuantity }));
        }
    };

    const handleRemovecart = (prodId) => {
        dispatch(removeFromCart(prodId)); // Pass only the productId
    };

    useEffect(() => {
        window.scrollTo({
            top: 0, // Scroll to the top
            behavior: 'smooth', // Enables smooth scrolling
        });
    }, []);
    
      
    return (
        <section className="section-cart py-[50px] max-[1199px]:py-[35px]">
            <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
                {cartItems && Object.keys(cartItems).length > 0 ? (
                    <div className="flex flex-wrap w-full mb-[-24px]">
                        <div className="min-[992px]:w-[33.33%] w-full px-[12px] mb-[24px]">
                            <div className="bb-cart-sidebar-block p-[20px] bg-[#f8f8fb] border-[1px] border-solid border-[#eee] rounded-[20px] aos-init aos-animate" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                                <div className="bb-sb-title mb-[20px]">
                                    <h3 className="font-quicksand tracking-[0.03rem] leading-[1.2] text-[20px] font-bold text-[#3d4750]">Summary</h3>
                                </div>
                                <div className="bb-sb-blok-contact">
                                    <div className="bb-cart-summary">
                                        <div className="inner-summary">
                                            <ul>
                                                <li className="mb-[12px] flex justify-between leading-[28px]">
                                                    <span className="text-left font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] text-[#686e7d] font-medium">Sub-Total</span>
                                                    <span className="text-right font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] text-[#686e7d] font-semibold">₹{parseInt(cartTotal).toFixed(2)}</span>
                                                </li>
                                                <li className="mb-[12px] flex justify-between leading-[28px]">
                                                    <span className="text-left font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] text-[#686e7d] font-medium">Delivery Charges</span>
                                                    <span className="text-right font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] text-[#686e7d] font-semibold">₹{deliveryCharge}</span>
                                                </li>
                                                <li className="mb-[12px] flex justify-between leading-[28px]">
                                                    <span className="text-left font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] text-[#686e7d] font-medium">Coupon Discount</span>
                                                    <span className="text-right font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] text-[#686e7d] font-semibold">
                                                        <a className="bb-coupon drop-coupon font-Poppins leading-[28px] tracking-[0.03rem] text-[14px] font-medium text-[#ff0000] cursor-pointer">Apply Coupon</a>
                                                    </span>
                                                </li>
                                                <li className="mb-[12px] flex justify-between leading-[28px]">
                                                    <div className="coupon-down-box w-full" >
                                                        <form method="post" className="relative mb-[15px]">
                                                            <input className="bb-coupon w-full p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] outline-[0] rounded-[10px]" type="text" placeholder="Enter Your coupon Code" name="bb-coupon" required=""/>
                                                            <button className="bb-btn-2 transition-all duration-[0.3s] ease-in-out my-[8px] mr-[8px] flex justify-center items-center absolute right-[0] top-[0] bottom-[0] font-Poppins leading-[28px] tracking-[0.03rem] py-[2px] px-[12px] text-[13px] font-normal text-[#fff] bg-[#6c7fd8] rounded-[10px] border-[1px] border-solid border-[#6c7fd8] hover:bg-transparent hover:border-[#3d4750] hover:text-[#3d4750]" type="submit">Apply</button>
                                                        </form>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="summary-total border-t-[1px] border-solid border-[#eee] pt-[15px]">
                                            <ul className="mb-[0]">
                                                <li className="mb-[6px] flex justify-between">
                                                    <span className="text-left font-Poppins text-[16px] leading-[28px] tracking-[0.03rem] font-semibold text-[#686e7d]">Total Amount</span>
                                                    <span className="text-right font-Poppins text-[16px] leading-[28px] tracking-[0.03rem] font-semibold text-[#686e7d]">₹{(parseInt(deliveryCharge + cartTotal)).toFixed(2)}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="min-[992px]:w-[66.66%] w-full px-[12px] mb-[24px]">
                            <div className="bb-cart-table border-[1px] border-solid border-[#eee] rounded-[20px] overflow-hidden max-[1399px]:overflow-y-auto aos-init aos-animate" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
                                <table className="w-full max-[1399px]:w-[750px]">
                                    <thead>
                                        <tr className="border-b-[1px] border-solid border-[#eee]">
                                            <th className="font-Poppins p-[12px] text-left text-[16px] font-medium text-[#3d4750] leading-[26px] tracking-[0.02rem] capitalize">Product</th>
                                            <th className="font-Poppins p-[12px] text-left text-[16px] font-medium text-[#3d4750] leading-[26px] tracking-[0.02rem] capitalize">Price</th>
                                            <th className="font-Poppins p-[12px] text-left text-[16px] font-medium text-[#3d4750] leading-[26px] tracking-[0.02rem] capitalize">quality</th>
                                            <th className="font-Poppins p-[12px] text-left text-[16px] font-medium text-[#3d4750] leading-[26px] tracking-[0.02rem] capitalize">Total</th>
                                            <th className="font-Poppins p-[12px] text-left text-[16px] font-medium text-[#3d4750] leading-[26px] tracking-[0.02rem] capitalize">&nbsp;</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {Object.values(cartItems).map(({ product, quantity }) => (
                                        <tr key={product.id} className="border-b-[1px] border-solid border-[#eee]">
                                            <td className="p-[12px]">
                                                <div className="Product-cart flex items-center">
                                                    <img src={product.thumbnail} alt="new-product-1" className="w-[70px] border-[1px] border-solid border-[#eee] rounded-[10px]"/>
                                                    <span className="ml-[10px] font-Poppins text-[14px] font-normal leading-[28px] tracking-[0.03rem] text-[#686e7d]">{product.title}</span>
                                                </div>
                                            </td>
                                            <td className="p-[12px]">
                                                <span className="price font-Poppins text-[15px] font-medium leading-[26px] tracking-[0.02rem] text-[#686e7d]">₹{product.price}</span>
                                            </td>
                                            <td className="p-[12px]">
                                                <div className="qty-plus-minus w-[85px] h-[45px] py-[7px] border-[1px] border-solid border-[#eee] overflow-hidden relative flex items-center justify-between bg-[#fff] px-2 rounded-[10px]">
                                                    <div className="dec bb-qtybtn" onClick={()=> handleDecrement(product.id)}>-</div>
                                                    <span>{cartItems[product.id]?.quantity || 1}</span>
                                                    <div className="inc bb-qtybtn" onClick={()=> handleIncrement(product.id)}>+</div>
                                                </div>
                                            </td>
                                            <td className="p-[12px]">
                                                <span className="price font-Poppins text-[15px] font-medium leading-[26px] tracking-[0.02rem] text-[#686e7d]">₹{(product.price * quantity)}</span>
                                            </td>
                                            <td className="p-[12px]">
                                                <div className="pro-remove">
                                                    <button onClick={()=>handleRemovecart(product.id)}>
                                                        <i className="ri-delete-bin-line transition-all duration-[0.3s] ease-in-out text-[20px] text-[#686e7d] hover:text-[#ff0000]"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>                    
                            <a href="checkout.html" className="bb-btn-2 mt-[24px] inline-flex items-center justify-center check-btn transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] py-[8px] px-[20px] text-[14px] font-normal text-[#fff] bg-[#6c7fd8] rounded-[10px] border-[1px] border-solid border-[#6c7fd8] hover:bg-transparent hover:border-[#3d4750] hover:text-[#3d4750] aos-init aos-animate" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">Check Out</a>
                        </div>
                    </div>
                ) : (
                    <div className="w-full text-center">
                        <h3 className="font-Poppins text-[20px] text-[#686e7d]">Your cart is empty.</h3>
                    </div>
                )}
            </div>
        </section>
    );
}

export default CartPage;