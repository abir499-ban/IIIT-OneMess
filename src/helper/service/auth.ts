import jwt from 'jsonwebtoken'
const secret_key = process.env.TOKEN_SECRET!;

export async function createToken(user:any){
    const payload = {
        id:user._id,
        fullname:user.fullname,
        ID:user.id,
        branch:user.branch,
    }
    
    return jwt.sign(payload,secret_key,{
        expiresIn:"1d"
    });
}