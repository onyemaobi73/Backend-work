import mongoose, { model } from "mongoose";

interface iUser {
    name?:string,
    email?:string
    password?:string,
    avatar? :string
    avatarID? :string
    bookMark? : Array<string>,
    post?: {}[]
}
 interface iUserData  extends iUser, mongoose.Document {}

 const userModel = new mongoose.Schema<iUser>(
    {
        name:{
            type:String
        },
        email:{
            type:String
        },
        password:{
            type:String
        },
        avatar:{
            type:String
        },
        avatarID:{
            type:String
        },
        bookMark:{
            type:Array<String>
        },
        post:[{
            type: mongoose.Types.ObjectId,
            ref:"posts"
        }],
    },
    { timestamps:true
    }
 )

 export default mongoose.model<iUserData>("iuser", userModel)