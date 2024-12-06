import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { ApiResponse } from "@/utils/Response";

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        const {userId} = body

        if(!userId) {
            return NextResponse.json(new ApiResponse(400, 'UserId is empty', [], false))
        }

        const totalAppointment = await prisma.appointment.findMany({
            where: {
                userId
            }
        })

        if(!totalAppointment) {
            return NextResponse.json(new ApiResponse(200, 'No any registered appointment', [], true))
        }

        return NextResponse.json(new ApiResponse(200, 'Fetched successfully', totalAppointment, true))
        
    } catch (error) {
        
    }
}