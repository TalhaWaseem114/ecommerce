import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Order() {
  // -->URL OF BACKEND SERVER
  const [url, setUrl] = useState("http://localhost:5000/")

  const [orderData, setOrderData] = useState([]);
  const [singleOrderData, setSingleOrderData] = useState({})
  const [showDetail, setShowDetail] = useState(false)
  const [showPaymentOption, setShowPaymentOption] = useState(false)

  const getOrder = async () => {
    const { data } = await axios.get("http://localhost:5000/api/orders");
    // console.log(data);
    setOrderData(data);

    // const dateArr= data.map((el)=>el.createdAt)
    // //  console.log(dateArr)
    //  let date = dateArr.map((el)=>(
    //   new Date(el)
    //  ));
    //  date=date.map((el)=>(
    //   el.toDateString()
    //  ))
    //  console.log(date)
  };

  useEffect(() => {
    getOrder();
  }, []);

  const getSingleOrder = async (id) => {
    let singleOrder = orderData.find((el) => el._id === id)
    singleOrder.date = new Date(singleOrder.createdAt).toLocaleString('en-GB', {day:'numeric', month: 'long', year:'numeric'})
    setSingleOrderData(singleOrder)
    setShowDetail(true)
  }

  const updatePayment = async (_id, paymentStatus) => {
    const { data } = await axios.patch(`http://localhost:5000/api/orders/${_id}`, { paymentStatus });
    console.log(data)
    getOrder();
    setShowDetail(false)
  }

  return (
    <div className="order">
      <h2 className="page-heading">Orders Detail</h2>
      <div className="table">
        <div className="table-header">
          <h3>Order ID</h3>
          <h3>Customer</h3>
          <h3>Order</h3>
          <h3>Total Price</h3>
          <h3>Payment Status</h3>
          <h3>Payment Method</h3>
        </div>
        <div className="table-body">
          {orderData.map((el, index) => (
            <div className="row" key={index} onClick={() => getSingleOrder(el._id)}>
              <p className="order-id txt-fade">{el._id}</p>
              <p className="customer">{el.shippingAddress.firstName} {el.shippingAddress.lastName}</p>
              <p className="no-of-order txt-fade">{el.orderItems.length} Products</p>
              <p className="total-price">${el.totalPrice}</p>
              <p className={el.paymentStatus === 'pending' ? 'pending payment-status' : 'completed payment-status'}>{el.paymentStatus}</p>
              <p className="payment-method txt-fade">{el.paymentMethod}</p>
            </div>
          ))}
        </div>
      </div>

      {/* =====================//////////////--DETAIL BOX */}
      {showDetail && (
        <div className="detail-wrapper">
          <i className="fa-solid fa-xmark" onClick={() => setShowDetail(false)}></i>
          <div className="detail-box">
            <p className="date">{singleOrderData.date}</p>
            <h3 className="heading">detail</h3>
            <div className="upper-flex">
              <h3 className="order-id">Order ID <span>{singleOrderData._id}</span></h3>

              {/* -----payment status update */}
              <div className="payment-status-wrapper" onClick={() => setShowPaymentOption(!showPaymentOption)}>
                <p className="label">Payment Status</p>
                <p className={singleOrderData.paymentStatus === 'pending' ? 'payment-status pending' : 'payment-status completed'}>
                  {singleOrderData.paymentStatus}
                  <i className="fa-solid fa-sort-down"></i>
                </p>
                {showPaymentOption && (
                  <>
                    {singleOrderData.paymentStatus === 'pending' ? (
                      <p className="option completed" onClick={() => updatePayment(singleOrderData._id, "completed")}>Completed</p>
                    ) : (
                      <p className="option pending" onClick={() => updatePayment(singleOrderData._id, "pending")}>Pending</p>
                    )}
                  </>
                )}
              </div>

            </div>
            <div className="items-list">
              {singleOrderData.orderItems.map((product) => (
                <div className="items" key={product._id}>
                  <div className="img-wrapper">
                    <img src={`${url}${product.image}`} alt={product.name} className={product.category === 'shoe' ? 'shoe-img' : null} />
                  </div>
                  <div className="content">
                    <Link to={`/productDetail/${product.slug}`}>{product.name}</Link>
                    <p className="price">${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="row-2">
              <div className="customer-detail">
                <h3 className="header">Customer Detail and Address</h3>
                <div className="info-slice">
                  <p className="label">Name  </p>
                  <p className="value">{singleOrderData.shippingAddress.firstName} {singleOrderData.shippingAddress.lastName}</p>
                </div>
                <div className="info-slice">
                  <p className="label">Country  </p>
                  <p className="value">{singleOrderData.shippingAddress.country}</p>
                </div>
                <div className="info-slice">
                  <p className="label">City  </p>
                  <p className="value">{singleOrderData.shippingAddress.city}</p>
                </div>
                <div className="info-slice">
                  <p className="label">Postal Code  </p>
                  <p className="value">{singleOrderData.shippingAddress.postalCode}</p>
                </div>
                <div className="info-slice">
                  <p className="label">Address  </p>
                  <p className="value">{singleOrderData.shippingAddress.address}</p>
                </div>
              </div>

              <div className="summary">
                <h3 className="header">Order Summary</h3>
                <div className="info-slice">
                  <p className="label">Order Created  </p>
                  <p className="value">{singleOrderData.createdAt}</p>
                </div>
                <div className="info-slice">
                  <p className="label">Sub Total  </p>
                  <p className="value">${singleOrderData.itemsPrice}</p>
                </div>
                <div className="info-slice">
                  <p className="label">shipping Price</p>
                  <p className="value">${singleOrderData.shippingPrice}</p>
                </div>
                <div className="info-slice">
                  <p className="label">Tax</p>
                  <p className="value">${singleOrderData.taxPrice}</p>
                </div>
                <div className="info-slice total">
                  <p className="label">Total</p>
                  <p className="value">${singleOrderData.totalPrice}</p>
                </div>
              </div>

            </div>

            <div className="note">
              <p>{singleOrderData.shippingAddress.message}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
