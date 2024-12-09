import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { ApiResponse } from "@/utils/Response";
import { generateToken } from "@/utils/jwtTokens";

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        const {email, password} = body

        const userExist = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if(!userExist) {
            return NextResponse.json(new ApiResponse(400, 'Email does not exist. Please signup!', [], false))
        }

        const response = await prisma.user.findFirst({
            where: {
                email,
                password
            }
        })

        if(!response) {
            return NextResponse.json(new ApiResponse(400, 'Unable to login', [], false))
        }
        
        const updateResponse = await prisma.user.update({
            where: {
                email,
            },
            data: {
                accessToken: generateToken({email})
            }
        })

        return NextResponse.json(new ApiResponse(200, 'login successfull', updateResponse, true))

    } catch (error) {
        return NextResponse.json(new ApiResponse(500, 'Unable to resolve the login function', [], false))
    }
}