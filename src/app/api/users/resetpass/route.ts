import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import bcryptjs from 'bcryptjs'

connect()

export async function POST(request:NextRequest) {

    try {

        const reqBody = await request.json()
        const {email, password} = reqBody

        console.log("Req : ::", reqBody)

        // hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        console.log(hashedPassword)

        const updatedUser = await User.findOneAndUpdate({email : email}, {
            password : hashedPassword,
        })

        updatedUser.forgetPasswordToken = undefined
        updatedUser.forgetPasswordTokenExpiry = undefined

        const savedUser = await updatedUser.save()


        return NextResponse.json({
            message : "Password is successfully updated.",
            success : true,
            savedUser
        })
        
    } catch (error : any) {
        return NextResponse.json({error : error.message}, {status : 500 })
    }

}