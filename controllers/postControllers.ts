import db from '../models'

    export const createPost = async (req:any, res:any) => {
        const {  tweet } = req.body;
        try {
          //const user = await db.User.findOne({ where: { id: userUuid } });
          const userid = req.userId;

          const post = await db.Post.create({ tweet, userId: userid });
         // console.log(user.id)
    
          return res.json(post);
        } catch (error) {
          console.log(error);
          return res.status(500).json(error);
        }
      }
      export const getPostsWithUser = async (req:any, res:any) => {
        try {
            //const post = await db.Post.findAll({ include: 'user' })
            const post = await db.Post.findAll({where:{userId:req.userId},include:"user"})
     
             return res.json(post)
         }catch (error){
             console.log(error)
             return res.status(500).json(error)
         }
    
    }
    

     
