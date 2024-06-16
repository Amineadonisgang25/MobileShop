import React, {useEffect, useState} from "react";
import {useSelector } from "react-redux";
export default function Checkout () {
    const [cartId, setCartId] = useState<string | null>(null);
    const cart = useSelector((state) => state.cart );
    const [customerInformation , setCustomerInformation] = useState({
        "email" : "", "phone": "" , "note":""
    });
    const [shippingAddress , setShippingAddress] = useState({
        "civility": "Mr", "firstName": "", "lastName": "", "zipCode": "", "street": "",
        "companyName": "", "country": "", "city": ""
    });
    const [billingAddress , setBillingAddress] = useState({
        "civility": "Mr", "firstName": "", "lastName": "", "zipCode": "", "street" : "",
        "companyName": "", "country": "", "city": ""
    });
    const [paymentMethod , setPaymentMethod] = useState("")
    const [submittedData , setSubmittedData] = useState(null);
    let items =  cart.items ; let totalPrice = cart.totalPrice;

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedCartId  = localStorage.getItem('cartId');
            setCartId(storedCartId);
        }
    }, []);
    const handleBillingInputChange = (event) => {
        const {name , value} = event.target;
        setBillingAddress((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
    const handleCustomerInformationInputChange = (event) => {
        const {name , value} = event.target;
        setCustomerInformation((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
    const handleShippingAddressInputChange = (event) => {
        const {name , value} = event.target;
        setShippingAddress((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
    const handlePaymentInputChange = (event) => {
        const {name , value} = event.target;
        setPaymentMethod((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
    const handleSubmitAction = (e) => {
        e.preventDefault();
        let data = {
            "cartid" : cartId,
            "total" : totalPrice,
            "items" : items,
            "customer" : {
                "email" : customerInformation.email ,
                "phone" : customerInformation.phone ,
                "note" : customerInformation.note,
                "billingAdress": billingAddress,
                "shippingAdress" : shippingAddress,
                "paymentMethod" : paymentMethod
            }
        }
        setSubmittedData(JSON.stringify(data));
    }
    useEffect(() => {
        async function SaveOrder(){
            const response = await fetch("http://localhost:3000/orders" ,{
                method: "POST", headers: {"Content-Type": "application/json",},
                body: submittedData}) ;
        }
        if(submittedData){
            SaveOrder();
        }
    }, [submittedData]);
    return (
        <>
            <div className="product-big-title-area">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="product-bit-title text-center">
                                <h2>Checkout</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="single-product-area">
                <div className="zigzag-bottom"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="product-content-right">
                                <div className="woocommerce">
                                    <form encType="multipart/form-data" lassName="checkout"
                                          name="checkout" onSubmit={handleSubmitAction}>
                                        <div id="customer_details" className="col2-set">
                                            <div className="col-6">
                                                <div className="woocommerce-billing-fields">
                                                    <h3>Billing Details</h3>
                                                    <p id="billing_country_field"
                                                       className="form-row form-row-wide address-field update_totals_on_change validate-required woocommerce-validated">
                                                        <label className="" htmlFor="billing_country">Civility <abbr
                                                            title="required" className="required">*</abbr>
                                                        </label>
                                                        <select className="country_to_state country_select"
                                                                id="shipping_country" name="civility" onClick={handleBillingInputChange}>
                                                            <option value="Mr" selected>Mr</option>
                                                            <option value="Mlle">Mlle</option>
                                                            <option value="Mme">Mme</option>
                                                        </select>
                                                    </p>
                                                    <p id="billing_first_name_field"
                                                       className="form-row form-row-first validate-required">
                                                        <label className="" htmlFor="billing_first_name">First
                                                            Name <abbr title="required" className="required">*</abbr>
                                                        </label>
                                                        <input type="text"
                                                               id="billing_first_name" name="firstName"
                                                               className="input-text " onChange={handleBillingInputChange}/>
                                                    </p>

                                                    <p id="billing_last_name_field"
                                                       className="form-row form-row-last validate-required">
                                                        <label className="" htmlFor="billing_last_name">Last Name <abbr
                                                            title="required" className="required">*</abbr>
                                                        </label>
                                                        <input type="text"
                                                               id="billing_last_name" name="lastName"
                                                               className="input-text " onChange={handleBillingInputChange}/>
                                                    </p>
                                                    <div className="clear"></div>

                                                    <p id="billing_company_field" className="form-row form-row-wide">
                                                        <label className="" htmlFor="billing_company">Company
                                                            Name</label>
                                                        <input type="text" id="company"
                                                               name="companyName" className="input-text "
                                                               onChange={handleBillingInputChange}
                                                        />
                                                    </p>

                                                    <p id="billing_address_1_field"
                                                       className="form-row form-row-wide address-field validate-required">
                                                        <label className="" htmlFor="billing_address_1">Address <abbr
                                                            title="required" className="required">*</abbr>
                                                        </label>
                                                        <input type="text" placeholder="Street address"
                                                               id="billing_address_1" name="street"
                                                               className="input-text " onChange={handleBillingInputChange}/>
                                                    </p>

                                                    {/*<p id="billing_address_2_field"*/}
                                                    {/*   className="form-row form-row-wide address-field">*/}
                                                    {/*    <input type="text"*/}
                                                    {/*           placeholder="Apartment, suite, unit etc. (optional)"*/}
                                                    {/*           id="billing_address_2" name="billing_address_2"*/}
                                                    {/*           className="input-text "/>*/}
                                                    {/*</p>*/}

                                                    <p id="billing_city_field"
                                                       className="form-row form-row-wide address-field validate-required"
                                                       data-o_class="form-row form-row-wide address-field validate-required">
                                                        <label className="" htmlFor="billing_city">Town / City <abbr
                                                            title="required" className="required">*</abbr>
                                                        </label>
                                                        <input type="text"  placeholder="Town / City"
                                                               id="billing_city" name="city"
                                                               className="input-text " onChange={handleBillingInputChange}/>
                                                    </p>

                                                    <p id="billing_state_field"
                                                       className="form-row form-row-first address-field validate-state"
                                                       data-o_class="form-row form-row-first address-field validate-state">
                                                        <label className="" htmlFor="billing_state">County</label>
                                                        <input type="text" id="billing_state" name="country"
                                                               placeholder="State / County"
                                                               className="input-text " onChange={handleBillingInputChange}/>
                                                    </p>
                                                    <p id="billing_postcode_field"
                                                       className="form-row form-row-last address-field validate-required validate-postcode"
                                                       data-o_class="form-row form-row-last address-field validate-required validate-postcode">
                                                        <label className="" htmlFor="billing_postcode">Postcode <abbr
                                                            title="required" className="required">*</abbr>
                                                        </label>
                                                        <input type="text"  placeholder="Postcode / Zip"
                                                               id="billing_postcode" name="zipCode"
                                                               className="input-text " onChange={handleBillingInputChange}/>
                                                    </p>

                                                    <div className="clear"></div>

                                                    <p id="billing_email_field"
                                                       className="form-row form-row-first validate-required validate-email">
                                                        <label className="" htmlFor="billing_email">Email Address <abbr
                                                            title="required" className="required">*</abbr>
                                                        </label>
                                                        <input type="text" placeholder="" id="billing_email"
                                                               name="email" className="input-text " onChange={handleCustomerInformationInputChange}/>
                                                    </p>

                                                    <p id="billing_phone_field"
                                                       className="form-row form-row-last validate-required validate-phone">
                                                        <label className="" htmlFor="billing_phone">Phone <abbr
                                                            title="required" className="required">*</abbr>
                                                        </label>
                                                        <input type="text"  placeholder="" id="billing_phone"
                                                               name="phone" className="input-text"
                                                               onChange={handleCustomerInformationInputChange}
                                                        />
                                                    </p>
                                                    <div className="clear"></div>


                                                </div>
                                            </div>

                                            <div className="col-6">
                                                <div className="woocommerce-shipping-fields">
                                                    <h3 id="ship-to-different-address">
                                                        <label className="checkbox"
                                                               htmlFor="ship-to-different-address-checkbox">Ship to a
                                                            different address?</label>
                                                        <input type="checkbox" value="1"
                                                               name="ship_to_different_address" checked="checked"
                                                               className="input-checkbox"
                                                               id="ship-to-different-address-checkbox"/>
                                                    </h3>
                                                    <div className="shipping_address" style={{ display: 'block' }}>
                                                        <p id="shipping_country_field"
                                                           className="form-row form-row-wide address-field update_totals_on_change validate-required woocommerce-validated">
                                                            <label className=""
                                                                   htmlFor="shipping_country">Civility <abbr
                                                                title="required" className="required">*</abbr>
                                                            </label>
                                                            <select className="country_to_state country_select"
                                                                    id="shipping_country" name="civility"
                                                                    onClick={handleShippingAddressInputChange}
                                                            >
                                                                <option value="Mr" selected>Mr</option>
                                                                <option value="Mlle">Mlle</option>
                                                                <option value="Mme">Mme</option>
                                                            </select>
                                                        </p>

                                                        <p id="shipping_first_name_field"
                                                           className="form-row form-row-first validate-required">
                                                            <label className="" htmlFor="shipping_first_name">First
                                                                Name <abbr title="required"
                                                                           className="required">*</abbr>
                                                            </label>
                                                            <input type="text"  placeholder=""
                                                                   id="shipping_first_name" name="firstName"
                                                                   className="input-text "
                                                                   onChange={handleShippingAddressInputChange}
                                                            />
                                                        </p>

                                                        <p id="shipping_last_name_field"
                                                           className="form-row form-row-last validate-required">
                                                            <label className="" htmlFor="shipping_last_name">Last
                                                                Name <abbr title="required"
                                                                           className="required">*</abbr>
                                                            </label>
                                                            <input type="text" placeholder=""
                                                                   id="shipping_last_name" name="lastName"
                                                                   className="input-text "
                                                                   onChange={handleShippingAddressInputChange}
                                                            />
                                                        </p>
                                                        <div className="clear"></div>

                                                        <p id="shipping_company_field"
                                                           className="form-row form-row-wide">
                                                            <label className="" htmlFor="shipping_company">Company
                                                                Name</label>
                                                            <input type="text" placeholder=""
                                                                   id="shipping_company" name="companyName"
                                                                   className="input-text "
                                                                   onChange={handleShippingAddressInputChange}
                                                            />
                                                        </p>

                                                        <p id="shipping_address_1_field"
                                                           className="form-row form-row-wide address-field validate-required">
                                                            <label className=""
                                                                   htmlFor="shipping_address_1">Address <abbr
                                                                title="required" className="required">*</abbr>
                                                            </label>
                                                            <input type="text"  placeholder="Street address"
                                                                   id="shipping_address_1" name="street"
                                                                   className="input-text "
                                                                   onChange={handleShippingAddressInputChange}
                                                            />
                                                        </p>

                                                        <p id="shipping_address_2_field"
                                                           className="form-row form-row-wide address-field">
                                                            <input type="text"
                                                                   placeholder="Apartment, suite, unit etc. (optional)"
                                                                   id="shipping_address_2" name="shipping_address_2"
                                                                   className="input-text "/>
                                                        </p>

                                                        <p id="shipping_city_field"
                                                           className="form-row form-row-wide address-field validate-required"
                                                           data-o_class="form-row form-row-wide address-field validate-required">
                                                            <label className="" htmlFor="shipping_city">Town /
                                                                City <abbr title="required"
                                                                           className="required">*</abbr>
                                                            </label>
                                                            <input type="text"  placeholder="Town / City"
                                                                   id="shipping_city" name="city"
                                                                   className="input-text"
                                                                   onChange={handleShippingAddressInputChange}
                                                            />
                                                        </p>

                                                        <p id="shipping_state_field"
                                                           className="form-row form-row-first address-field validate-state"
                                                           data-o_class="form-row form-row-first address-field validate-state">
                                                            <label className="" htmlFor="shipping_state">County</label>
                                                            <input type="text" id="shipping_state" name="country"
                                                                   placeholder="State / County"
                                                                   className="input-text "
                                                                   onChange={handleShippingAddressInputChange}
                                                            />
                                                        </p>
                                                        <p id="shipping_postcode_field"
                                                           className="form-row form-row-last address-field validate-required validate-postcode"
                                                           data-o_class="form-row form-row-last address-field validate-required validate-postcode">
                                                            <label className=""
                                                                   htmlFor="shipping_postcode">Postcode <abbr
                                                                title="required" className="required">*</abbr>
                                                            </label>
                                                            <input type="text"  placeholder="Postcode / Zip"
                                                                   id="shipping_postcode" name="zipCode"
                                                                   className="input-text "
                                                                   onChange={handleShippingAddressInputChange}
                                                            />
                                                        </p>

                                                        <div className="clear"></div>


                                                    </div>


                                                    <p id="order_comments_field" className="form-row notes">
                                                        <label className="" htmlFor="order_comments">Order Notes</label>
                                                        <textarea cols="5" rows="2"
                                                                  placeholder="Notes about your order, e.g. special notes for delivery."
                                                                  id="order_comments" className="input-text "
                                                                  name="note" onChange={handleCustomerInformationInputChange}></textarea>
                                                    </p>


                                                </div>

                                            </div>

                                        </div>

                                        <h3 id="order_review_heading">Your order</h3>

                                        <div id="order_review" style={{ position: 'relative'}} >
                                            <table className="shop_table">
                                                <thead>
                                                <tr>
                                                    <th className="product-name">Product</th>
                                                    <th className="product-total">Total</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr className="cart_item">
                                                    <td className="product-name">
                                                        Ship Your Idea <strong className="product-quantity">× 1</strong>
                                                    </td>
                                                    <td className="product-total">
                                                        <span className="amount">£15.00</span></td>
                                                </tr>
                                                </tbody>
                                                <tfoot>

                                                <tr className="cart-subtotal">
                                                    <th>Cart Subtotal</th>
                                                    <td><span className="amount">{cart.totalPrice} €</span>
                                                    </td>
                                                </tr>

                                                <tr className="shipping">
                                                    <th>Taxe (20%)</th>
                                                    <td>
                                                        {cart.totalPrice * 0.2}  €
                                                    </td>
                                                </tr>


                                                <tr className="order-total">
                                                    <th>Order Total</th>
                                                    <td><strong><span className="amount">{cart.totalPrice * 0.8} €</span></strong></td>
                                                </tr>

                                                </tfoot>
                                            </table>
                                            <div id="payment">
                                                <ul className="payment_methods methods">
                                                    <li className="payment_method_bacs">
                                                        <input type="radio" data-order_button_text=""
                                                               value="bancs" name="paymentMethod"
                                                               className="input-radio" id="payment_method_bacs" onClick={handlePaymentInputChange}/>
                                                        <label htmlFor="payment_method_bacs">Direct Bank
                                                            Transfer </label>
                                                        <div className="payment_box payment_method_bacs">
                                                            <p>Make your payment directly into our bank account. Please
                                                                use your Order ID as the payment reference. Your order
                                                                won’t be shipped until the funds have cleared in our
                                                                account.</p>
                                                        </div>
                                                    </li>
                                                    <li className="payment_method_cheque">
                                                        <input type="radio" data-order_button_text="" value="cheque"
                                                               name="paymentMethod" className="input-radio"
                                                               id="payment_method_cheque" onClick={handlePaymentInputChange}/>
                                                        <label htmlFor="payment_method_cheque">Cheque Payment </label>
                                                        <div style={{display: "none"}}
                                                             className="payment_box payment_method_cheque">
                                                            <p>Please send your cheque to Store Name, Store Street,
                                                                Store Town, Store State / County, Store Postcode.</p>
                                                        </div>
                                                    </li>
                                                    <li className="payment_method_paypal">
                                                        <input type="radio" data-order_button_text="Proceed to PayPal"
                                                               value="paypal" name="paymentMethod"
                                                               className="input-radio" id="payment_method_paypal" onClick={handlePaymentInputChange}/>
                                                        <label htmlFor="payment_method_paypal">PayPal <img
                                                            alt="PayPal Acceptance Mark"
                                                            src="https://www.paypalobjects.com/webstatic/mktg/Logo/AM_mc_vs_ms_ae_UK.png"/><a
                                                            title="What is PayPal?"
                                                            // onClick="javascript:window.open('https://www.paypal.com/gb/webapps/mpp/paypal-popup','WIPaypal','toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=1060, height=700'); return false;"
                                                            className="about_paypal"
                                                            href="https://www.paypal.com/gb/webapps/mpp/paypal-popup">What
                                                            is PayPal?</a>
                                                        </label>
                                                        <div style={{display: "none"}}
                                                             className="payment_box payment_method_paypal">
                                                            <p>Pay via PayPal; you can pay with your credit card if you
                                                                don’t have a PayPal account.</p>
                                                        </div>
                                                    </li>
                                                </ul>

                                                <div className="form-row place-order">

                                                    <input type="submit" data-value="Place order" value="Place order"
                                                           id="place_order" name="woocommerce_checkout_place_order"
                                                           className="button alt"/>


                                                </div>

                                                <div className="clear"></div>

                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}