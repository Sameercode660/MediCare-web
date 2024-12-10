import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { ApiResponse } from "@/utils/Response";
import { verifyToken } from "@/utils/jwtTokens";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { token } = body;

    const verify = verifyToken(token);

    if (!verify) {
      return NextResponse.json(
        new ApiResponse(400, "Token is expired please loign", [], false)
      );
    }

    const response = await prisma.user.findFirst({
      where: {
        accessToken: token,
      },
    });

    if (!response) {
      return NextResponse.json(
        new ApiResponse(400, "Unable to find the token", [], false)
      );
    }

    return NextResponse.json(
      new ApiResponse(200, "Login successfull", response, true)
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
