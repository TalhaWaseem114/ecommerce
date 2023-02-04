import axios from 'axios';
import React, { useEffect, useState } from 'react'
import cart from "../../img/cart-lg.png"
import wallet from "../../img/wallet-lg.png"
import userImg from "../../img/user-lg.png"

import { Bar, Pie, Line, Bubble, Doughnut, PolarArea, Radar, Scatter } from 'react-chartjs-2'
import { Chart as ChartJS } from "chart.js/auto"


export default function AdminMain() {

  const [orders, setOrders] = useState([])
  const [earing, setEaring] = useState(0)
  const [user, setUser] = useState(0)
  const [saleData, setSaleData] = useState()


  const getOrder = async () => {
    const { data } = await axios.get("http://localhost:5000/api/orders");
    setOrders(data)
    const totalPrice = data.filter((el) => el.paymentStatus === 'completed').reduce((total, item) => total + item.totalPrice, 0);
    setEaring(totalPrice)

    const res = await axios.get("http://localhost:5000/api/users/allUsers");
    setUser(res.data)

  };

  useEffect(() => {
    getOrder()
  }, [])

  useEffect(() => {
    setSaleData({
      labels: orders.map((el) => el.createdAt),
      datasets: [{
        label: "Product Sale",
        data: orders.map((el) => el.orderItems.length),
        tension: 0.4,
        fill: true,
      }]
    })
  }, [orders])


  return (
    <div className='admin-home'>
      <div className="row">
        <div className="block order-block">
          <div className="content">
            <h3>{orders.length}</h3>
            <p>Total Orders</p>
          </div>
          <img src={cart} alt="orders" />
        </div>
        <div className="block earning-block">
          <div className="content">
            <h3>${earing.toFixed(2)}</h3>
            <p>Total Earning</p>
          </div>
          <img src={wallet} alt="earing" />
        </div>
        <div className="block user-block">
          <div className="content">
            <h3>{user.length}</h3>
            <p>Total Users</p>
          </div>
          <img src={userImg} alt="user" />
        </div>
      </div>

      {/* ---------------------------///////////--GRAPHS */}
      {
        saleData && (
          <div className="chart-box">
            <h3>Product Sale</h3>
            {/* <Bar data={saleData} /> */}
            <Line data={saleData}/>
          </div>
        )
      }
    </div>
  )
}
