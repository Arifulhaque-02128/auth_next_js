import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";  
import { connect } from "@/dbConfig/dbConfig";

connect()

export async function POST (request : NextRequest) {

    try {

        const requestBody = await request.json()
        const {token, emailType} = requestBody

        let userInfo:any;

        if(emailType === "VERIFY"){
            userInfo = await User.findOne({verifyToken : token, verifyTokenExpiry : {$gt : Date.now()} })
        } else {
            userInfo = await User.findOne({forgetPasswordToken : token, forgetPasswordTokenExpiry : {$gt : Date.now()} })
        }

        

        if(!userInfo) {
            return NextResponse.json({error : "Invalid token."}, {status : 400})
        }
        console.log(userInfo)

        userInfo.isVerified = true
        userInfo.verifyToken = undefined,
        userInfo.verifyTokenExpiry = undefined
        await userInfo.save()

        return NextResponse.json({
            message : "Verification Successfull.",
            email : userInfo.email,
            success : true
        })
        
    } catch (err : any) {
        return NextResponse.json({error: err.message}, {status : 500})
    }

}