const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { chats } = require('./data/data');
const cors = require('cors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const app = express();
app.use(cors());
dotenv.config();
connectDB();

app.use(express.json());//to accept json data
app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);


app.use(notFound);
app.use(errorHandler);

// app.get('/',(req,res)=>{
//     res.send('Api is running');
// });
// app.get('/api/chats',(req,res)=>{
//     res.send(chats);   
// });
// app.get('/api/chat/:id',(req,res)=>{
//     const id = req.params;
//     //fetch id from url of server
//     res.send(id)
// })

const PORT = process.env.PORT || 5000
app.listen(5000,console.log(`Server started at PORT : ${PORT}`))