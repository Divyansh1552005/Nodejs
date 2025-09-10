import jwt from "jsonwebtoken"

export const authenticationmiddleware = async function(req,res,next){
    try {
       // ye middleware har request k saath uski authorization ie saari properties chipka dega
       const tokenHeader = req.headers["authorization"];
       // header authorization : bearer <Token>
   
       if (!tokenHeader) return next(); // if no token header that means user aint logged in
   
       // it should always start with Bearer
       if (!tokenHeader.startsWith("Bearer")) {
         return res.status(400).json({
           error: "Auth header must start with bearer",
         });
       }
   
       // split the header so as to remove bearer to get token
       const token = tokenHeader.split(" ")[1];
   
       // decode the token ie verify if sahi hai ya nahi token
       // decoded object will contain the JWT Payload ie user ki saari info
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
   
       req.user = decoded;
       next();
     } catch {
       next();
     }

}


export const ensureAuthenticated = async function (req,res, next){
    if(!req.user){
        return res.status(401).json({
            error : "You must be authenticated to access this resource!"
        })
    }

    next();
}

// this is not a middleware , it will return a middleware that we will use
export const restrictToRole = function (role){
    return function(req,res,next){
        if(req.user.role !== role){
            return res.status(401).json({
                error : "You are not authorized to access this resource"
            })
        }

        return next();
    }

    
}