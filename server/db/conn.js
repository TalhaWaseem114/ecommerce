import mongoose from 'mongoose';

// ===================connect to database====================
mongoose.connect('mongodb://localhost:27017/amazona').then(()=>{
  console.log('connected to mongodb');
}).catch((err)=>{
console.log(err.message);
})
