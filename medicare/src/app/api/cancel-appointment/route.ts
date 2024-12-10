import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { ApiResponse } from "@/utils/Response";
import { cancelMail } from "@/utils/cancelMail";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { id } = body;

    if (!id) {
      return NextResponse.json(
        new ApiResponse(400, "Id is found empty", [], false)
      );
    }

    const response = await prisma.appointment.delete({
      where: {
        id,
      },
    });

    if (!response) {
      return NextResponse.json(
        new ApiResponse(
          400,
          "Unable to delete the appointmen/Does not exist",
          [],
          false
        )
      );
    }
    await cancelMail(
      response.email,
      "Appointment Cancelled",
      response.fullName,
      "Sorry to inform you that your appointment has been cancelled"
    );
    return NextResponse.json(
      new ApiResponse(
        200,
        "Successfully deleted the appointment",
        response,
        true
      )
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
