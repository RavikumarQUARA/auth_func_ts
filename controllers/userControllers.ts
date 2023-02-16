import db from '../models'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


//interface ResponseType {data:string;msg:string}



// login

export const login = async (req: any, res: any) => {
    const { email, password } = req.body;
    try{
        const user= await db.User.findOne( {where: { email: email }})
        if(!user){
           return res.status(404).json({ msg: 'User not found' })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        
        if(!isPasswordMatch){
           return res.status(400).json({ msg:"password does not match" });
        }
        
           const SECRET_KEY = process.env.SECRET_KEY || "";

           const token = jwt.sign({email:user.email, id:user.id},SECRET_KEY, {expiresIn: '1d'});
        
    res.status(200).json(token);
    }catch(e:any){
        res.status(201).json({ msg: 'Login failed' })
        console.log(e.message)
        

    }
}


export const getUser = async (req:any, res:any) => {
    try {
    
        const post = await db.User.findAll()
 
         return res.json(post)
     }catch (error:any){
         console.log(error)
         return res.status(500).json({msg:error.message})
     }

}

export const createUser = async (req:any, res:any) => {
    const {email,name,username,password} = req.body;
        try {
           
            const existingUser = await db.User.findOne({where:{email:email}});
            if(existingUser){
                return res.status(400).json({ msg: 'User already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = await db.User.create({ email,name,username, password:hashedPassword});
            const SECRET_KEY = process.env.SECRET_KEY || "Test";

            const token = jwt.sign({email:user.email, id:user.id},SECRET_KEY, {expiresIn: '1d'});
            return res.status(201).json(token);  
        }catch(error){
        res.send(error)
            return res.status(400).send('error,user not created')

            
        }
}
export const updateUser = async (req:any, res:any) => {
    const id = req.params.id
    const { name, email, username,password } = req.body
    try {
        const user = await db.User.findOne({ where: { id: req.userId } }) 
        
       if(name)
        user.name = name
        if(email)
        user.email = email
        if(username)
        user.username= username
        if(password){
        const hashedPassword = await bcrypt.hash(password, 12);
        user.password= hashedPassword}
        await user.save()
        res.status(200).json({message: 'success'})
    }catch (error){
        console.log(error)
        return res.status(500).json({error: 'Something went wrong'})
    }
}
export const deleteUser = async (req:any, res:any) => {
    const id = req.params.id

    try {
        const user = await db.User.findOne({where: { id: id },})
        await user.destroy()
        
        return res.json({message: 'User has been deleted!'})
    }catch (error){
        console.log(error)
        return res.status(500).json({error: 'Something went wrong'})
    }
}

export const logout = async (req:any, res:any) => {
    const token = req.headers.authorization.split(' ')[1]
// verify the token
try {
    const decodeData:any = jwt.verify(token, process.env.SECRET_KEY || "Test")
    //decodeData.destroy()
    //return res.json(decodeData)

  //TODO: delete or mark as invalid in the database  
}catch (error){
    console.log(error)
    
}
res.status(200).json({message: 'logout sucessful'})



}
