import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").max(30, "Username must be at most 30 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must contain at least 8 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // 1. Validate all fields
    const validationResult = registerSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { message: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const { username, email, password } = validationResult.data;

    // 2. Check whether the email already exists
    const existingEmail = await db.user.findUnique({
      where: { email },
    });
    
    if (existingEmail) {
      return NextResponse.json(
        { message: "Email already exists." },
        { status: 409 }
      );
    }

    // 3. Check whether the username already exists
    const existingUsername = await db.user.findUnique({
      where: { anonymousName: username },
    });

    if (existingUsername) {
      return NextResponse.json(
        { message: "Username is already taken." },
        { status: 409 }
      );
    }

    // 4. Hash the password securely
    const passwordHash = await bcrypt.hash(password, 10);

    // 5. Create the user in the database (including the anonymous identity)
    const newUser = await db.user.create({
      data: {
        email,
        anonymousName: username,
        passwordHash,
        realName: "Anonymous User", // Dummy value to satisfy the database schema
      },
    });

    return NextResponse.json(
      { message: "Account successfully created." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Unable to create account. Please try again." },
      { status: 500 }
    );
  }
}
