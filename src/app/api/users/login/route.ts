import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import mongoose from "mongoose";
import jwt from 'jsonwebtoken'

connect()

export async function POST(request : NextRequest) {

    try {
        const reqBody = await request.json()
        const {email, password} = reqBody

        console.log(reqBody)

        // check if user exists
        const user = await User.findOne({email})

        // console.log("user:::", user)
        if(!user) {
            // console.log("user not found.")
            return NextResponse.json({error: "User doesn't exist."}, {status : 400})
        }


        // check if password is valid or not?
        const isPasswordValid = await bcryptjs.compare(password, user.password)
        if(!isPasswordValid) {
            return NextResponse.json({error: 'Invalid Password.'}, {status : 400})
        }

        // create token data
        const tokenData = {
            id : user._id,
            username : user.username,
            email : user.email,
        }

        // create token
        const token = await jwt.sign(tokenData, process.env.SECRET_TOKEN!, {expiresIn : '1d'})
        

        const response = await NextResponse.json({
            message : 'Login Successfull.',
            data : { username: user.username, email : user.email},
            success : true
        })

        response.cookies.set("token", token, {httpOnly : true})

        return response;


    } catch (error : any) {
        return NextResponse.json({error : error.message}, {status : 500 })
    }
    
}