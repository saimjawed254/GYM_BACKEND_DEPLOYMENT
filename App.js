import express from "express";
import {config} from "dotenv";
import cors from "cors";
import {sendEmail} from "./utils/sendEmail.js";

const app=express();
const router = express.Router();

config({path: "./config.env"});

app.use(cors({
    origin :[process.env.FRONTEND_URL],
    methods:["POST"],
    credentials:true,
})) //Middleware

app.use(express.json())  //To parse data in json format
app.use(express.urlencoded({
    extended:true
})) //To verify incoming data format

// router.get("/",(req,res,next)=>{
//     res.json({
//         success:true,
//         message:"All Good",
//     })
// })

router.post("/send/mail", async (req,res,next)=>{
    const {name,email,message}=req.body;
    if(!name || !email || !message){
        return next(res.status(400).json({
            success:false,
            message: "Please provide all the details",
        }))
    }
    try{
        await sendEmail({
            email,
            subject  : "GYM WEBSITE CONTACT FORM",
            message,
            userEmail : email
        })
        res.status(200).json({
            success : true,
            message : "Contacted Gym Successfully",
        });
    } catch(error){console.log(error);
        res.status(500).json({
            success : false,
            message : "Internal Server Error"
        });
    }
});

app.use(router);  //Middleware for router

app.listen(process.env.PORT,()=>{
    console.log ('Server listening at port '+process.env.PORT);
});