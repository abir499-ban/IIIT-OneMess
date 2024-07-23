import { connectToDB } from '@/dbConfig/dbConfig'
import bycrypt from 'bcryptjs'
import User from '@/models/User'
import { NextRequest, NextResponse } from 'next/server'
import {createToken} from '@/helper/service/auth'

export async function POST(request: NextRequest) {
    connectToDB();
    const reqBody = await request.json();
    const { id, password } = reqBody;
    try {
        const doesUserexist = await User.findOne({id:id});
        if(!doesUserexist) return NextResponse.json({message:"First create your account!!"}, {status:401});
        //check password
        const validatePassword = await bycrypt.compare(password, doesUserexist.password);
        if(!validatePassword) return NextResponse.json({message:"wrong Password"}, {status:401});

        const token  = await createToken(doesUserexist);
        const response = NextResponse.json({message:'Login successfull', success:true},{status:201});
        response.cookies.set("token", token);
        return response;

    } catch (error: any) {
        console.log("error occured ", error);
        return NextResponse.json({ message: "Server error occured " }, { status: 500 });
    }
}