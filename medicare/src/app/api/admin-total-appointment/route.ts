import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { ApiResponse } from "@/utils/Response";

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
    try {
        const response = await prisma.appointment.findMany({})

        if(!response) {
            return NextResponse.json(new ApiResponse(200, 'No any active appointment', [], false))
        }

        return NextResponse.json(new ApiResponse(200, "Appointment fetched successfully", response, true))
    } catch (error) {
        return NextResponse.json(new ApiResponse(500, 'Unable to resolve the fetch appointment', [], false))
    }
}