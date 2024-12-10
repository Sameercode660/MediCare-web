import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { ApiResponse } from "@/utils/Response";
import { generateToken } from "@/utils/jwtTokens";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { fullName, email, mobileNumber, password } = body;

    if (!fullName || !email || !mobileNumber || !password) {
      return NextResponse.json(
        new ApiResponse(400, "Anyone field is empty", [], false)
      );
    }

    const existUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (existUser) {
      return NextResponse.json(
        new ApiResponse(400, "User already exist", [], false)
      );
    }

    const token = generateToken({ email });

    const response = await prisma.user.create({
      data: {
        fullName,
        email,
        mobileNumber,
        password,
        accessToken: token,
      },
    });

    if (!response) {
      return NextResponse.json(
        new ApiResponse(500, "Unable to create the account", [], false)
      );
    }

    return NextResponse.json(
      new ApiResponse(200, "user registered successfully", response, true)
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
