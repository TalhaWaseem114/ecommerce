const axios = require("axios");

const getOrder = async () => {
  const { data } = await axios.get("http://localhost:5000/api/orders");
 const dateArr= data.map((el)=>el.createdAt)
//  console.log(dateArr)
 const date = dateArr.map((el)=>(
  new Date(el)
 ));
 console.log(date)
};

getOrder()