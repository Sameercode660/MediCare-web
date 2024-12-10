import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { ApiResponse } from "@/utils/Response";

const prisma = new PrismaClient();

export async function POST() {
  try {
    const response = await prisma.appointment.findMany({});

    if (!response) {
      return NextResponse.json(
        new ApiResponse(200, "No any active appointment", [], false)
      );
    }

    return NextResponse.json(
      new ApiResponse(200, "Appointment fetched successfully", response, true)
    );
  } catch (error: unknown) {

    let errorMessage = "An unexpected error occurred";

    if (error instanceof Error) {
      errorMessage = error.message; // Safe access after type checking
    }

    console.error("Error:", error);

    return NextResponse.json(new ApiResponse(500, errorMessage, [], false));
  }
}
