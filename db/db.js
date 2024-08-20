const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://sevindu:12345@cluster-1.xskbc.mongodb.net/?retryWrites=true&w=majority&appName=cluster-1",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const connection=mongoose.connection
connection.once("open",()=>{
    console.log("MongoDB connected")
})

mongoose.set('strictQuery',true)