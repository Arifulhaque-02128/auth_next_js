import { connect } from "@/dbConfig/dbConfig";
import { sendMail } from "@/helpers/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


connect()

export async function POST(request : NextRequest) {

    try {
        const reqBody = await request.json()
        const {email} = reqBody

        console.log(reqBody)

        // check if user exists
        const user = await User.findOne({email})

        // console.log("user:::", user)
        if(!user) {
            // console.log("user not found.")
            return NextResponse.json({error: "User doesn't exist."}, {status : 400})
        }

        await sendMail({email, emailType : "RESET", userId : user._id})

        return NextResponse.json({
            message : 'User Found.',
            success : true,
        })


    } catch (error : any) {
        return NextResponse.json({error : error.message}, {status : 500 })
    }
    
}