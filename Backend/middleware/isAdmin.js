const isAdmin = (req,res,next) => {
    console.log(req.user.role);


    
    if(req.user.role !== 'admin'){
        return res.status(403).send({
            message : "Access denied : Admins only"
        });
    }
    next();
};

module.exports = isAdmin;


/*

Step -1) create a dynamic route
localhost/id
isAdmin middleware
Step-2) access the id from the params
step-3) find the user into db on the basis of id.
step-4) access the role of the user which is found into db

*/