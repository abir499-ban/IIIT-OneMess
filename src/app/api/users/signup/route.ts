import { connectToDB } from '@/dbConfig/dbConfig'
import bycrypt from 'bcryptjs'
import User from '@/models/User'
import { NextRequest, NextResponse } from 'next/server'


export async function POST(request: NextRequest) {
    connectToDB();
    const reqBody = await request.json();
    const { fullname, id, branch, password } = reqBody;

    try {
        const user = await User.findOne({id:id});
        if (user) return NextResponse.json({ message: "User already exists" }, { status: 401 });
        //hashing password
        const salt = await bycrypt.genSalt(10);
        const hashedpassword = await bycrypt.hash(password, salt);
        const new_user = new User({
            fullname: fullname,
            id: id,
            password: hashedpassword,
            branch: branch,
        })
        const saved_user = await new_user.save();
        return NextResponse.json({ message: "Account created sucesssfully", success: true, saved_user }, {
            status: 201
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"Unexpected error occured"}, {status:500})
    }


}