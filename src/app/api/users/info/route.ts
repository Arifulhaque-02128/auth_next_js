import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { connect } from "@/dbConfig/dbConfig";

connect()

export async function GET(request: NextRequest){

    try {

        const userId = await getDataFromToken(request)
        const userInfo = await User.findById({_id : userId}).select("-password")

        return NextResponse.json({
            message : "User Found",
            data : userInfo
        })
        
    } catch (err: any) {
        return NextResponse.json({error : err.message}, {status : 500})
    }
}