import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { ApiResponse } from "@/utils/Response";
import { sendEmail } from "@/utils/sendmail";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      userId,
      fullName,
      email,
      mobileNumber,
      address,
      appointmentDate,
    } = body;

    if (
      !userId ||
      !fullName ||
      !email ||
      !mobileNumber ||
      !address ||
      !appointmentDate 
    ) {
      return NextResponse.json(
        new ApiResponse(400, "Anyone field is empty", [], false)
      );
    }

    console.log(body);

    const response = await prisma.appointment.create({
      data: {
        userId,
        fullName,
        email,
        mobileNumber,
        address,
        appointmentDate 
      },
    });

    await sendEmail(email, 'Appointment booked', fullName, 'appointment booked succssfully')
    console.log(response)

    if (!response) {
      return NextResponse.json(
        new ApiResponse(
          500,
          "Unable to book apoinment, try again later",
          [],
          false
        )
      );
    }

    return NextResponse.json(
      new ApiResponse(200, "Appointment Booked Successfully", response, true)
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      new ApiResponse(500, "Unable to resolve the book appointment", [], false)
    );
  }
}
