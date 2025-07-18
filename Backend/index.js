require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require("cookie-parser");
const userRoutes = require('./routes/userRoutes')
const blogRoutes = require('./routes/blogRoutes')
const contactRoutes = require("./routes/contactRoutes");
const connectDb = require('./config/db')

const app = express();

app.use(cors({
    origin:["https://blog-2-o.vercel.app","http://localhost:5173"], 
    credentials: true,
}));

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/blog', blogRoutes)
app.use("/api", contactRoutes);

connectDb();
app.get('/', (req, res) => {
    res.send("hello")
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);

})