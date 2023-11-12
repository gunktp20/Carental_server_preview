import { StatusCodes } from "http-status-codes";

const verifyAdmin = (req, res, next) => {
    if(!req.user.userId||!req.user.role){
        return res.status(StatusCodes.UNAUTHORIZED).json({msg:"require admin role !"})
    } 
    if(req.user.role !== "admin"){
        return res.status(StatusCodes.UNAUTHORIZED).json({msg:"require admin role !"})
    }
    next()
};

export default verifyAdmin