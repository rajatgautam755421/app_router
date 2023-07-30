import { prisma } from "@/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  const reqBody = await req.json();

  try {
    let user;
    // creating a user

    if (reqBody.requestType === "register") {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(reqBody.password, salt);

      user = await prisma.user.create({
        data: { ...reqBody, password: hashedPassword, requestType: undefined },
      });
    }

    if (reqBody.requestType === "login") {
      const userExists = await prisma.user.findUnique({
        where: {
          email: reqBody.email,
        },
      });

      if (!userExists) {
        throw new Error("User With This Email Doesn't Exixts");
      }

      const passwordMatch = await bcrypt.compare(
        reqBody.password,
        userExists.password
      );

      if (!passwordMatch) {
        throw new Error("Password Is Invalid");
      }
      const userToken = generateToken(userExists.id);
      user = { ...userExists, token: userToken };
    }

    return NextResponse.json({ data: user }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
