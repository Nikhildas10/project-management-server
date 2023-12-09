const jwt=require("jsonwebtoken")

exports.jwtMiddleware=(req,res,next)=>{
    //access token
    const token=req.headers["accesstoken"]?.split(" ")[1];
    console.log(token);

    //verify
    try{
        console.log("inside");
const jwtResponse=jwt.verify(token,"superkey123")
console.log(jwtResponse);
req.payload=jwtResponse._id
next()
    }
    catch{
res.status(401).json("authourization failed! please login")
    }
}