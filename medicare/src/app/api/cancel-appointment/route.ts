import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { ApiResponse } from "@/utils/Response";

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

    return NextResponse.json(
      new ApiResponse(
        200,
        "Successfully deleted the appointment",
        response,
        true
      )
    );
  } catch (error) {
    return NextResponse.json(
      new ApiResponse(500, "Unable to resolve cancel appointment", [], false)
    );
  }
}
