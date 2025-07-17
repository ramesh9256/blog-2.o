
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Home from "./components/pages/Home";
import CreateBlog from "./components/pages/CreateBlog";
import BlogDetails from "./components/pages/BlogDetails";
import Navbar from "./components/Navbar";
import EditBlog from "./components/pages/EditBlog";
import MyBlogs from "./components/pages/MyBlogs";
import Footer from "./components/Footer";
import About from "./components/About";
import Contact from "./components/Contact"
const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/create" element={<CreateBlog />}/>
          <Route path="/blog/:id" element={<BlogDetails />}/>
          <Route path="/edit-blog/:id" element={<EditBlog />}/>
          <Route path="/my-blogs" element={<MyBlogs/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
};

export default App;