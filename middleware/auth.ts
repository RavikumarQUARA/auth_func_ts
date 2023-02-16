import jwt from 'jsonwebtoken';
const revokeTokens:any = {};


const auth =async (req:any, res:any, next:any) => {
    try{
        const token = req.headers.authorization;
        const oToken = token.split(' ')[1];
        const decoded:any = jwt.verify(oToken, process.env.SECRET_KEY || "Test");
        req.userId = decoded.id;
        next()
    }catch(error:any){
        return res.status(400).json({ msg: "Unauthorized"});
        
    }
}


export  default auth;