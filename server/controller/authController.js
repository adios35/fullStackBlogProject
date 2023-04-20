import { PrismaClient } from "@prisma/client";
export const client = new PrismaClient();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
// import multer from "multer";

cloudinary.config({
  //eslint-disable-next-line
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  //eslint-disable-next-line
  api_key: process.env.CLOUDINARY_API_KEY,
  //eslint-disable-next-line
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function register(req, res) {
  const { email, password } = req.body;
  const file = req.files.photoURL;
  if (!email || !password)
    return res.status(400).json({ msg: "masukan input" });
  try {
    const userExists = await client.user.findUnique({
      where: {
        email,
      },
    });
    if (userExists) {
      return res.status(409).json({ msg: "Email already taken" });
    }

    const data = await cloudinary.uploader
      .upload(file.tempFilePath, {
        public_id: Date.now(),
        resource_type: "auto",
        folder: "users",
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await client.user.create({
      data: {
        email,
        password: hashedPassword,
        photoURL: data.url,
      },
    });
    res.status(201).send({ msg: "success", user });
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
}

export async function login(req, res) {
  // console.log(process.env.ACCESS_TOKEN_SECRET);
  try {
    const { password, email } = req.body;

    const exist = await client.user.findUnique({
      where: {
        email,
      },
    });
    if (!exist) return res.status(404).json({ msg: "akun tidak terdaftar" });
    const unhashed = await bcrypt.compare(password, exist.password);
    if (!unhashed)
      return res.status(401).json({ msg: "password tidak sesuai" });
    const accessToken = await jwt.sign(
      { email: exist.email },
      //eslint-disable-next-line
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );
    const refreshToken = await jwt.sign(
      { email: exist.email },
      //eslint-disable-next-line
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "30d",
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 1000,
    });
    await client.user.update({
      where: { email },
      data: { refresh_token: refreshToken },
    });
    // Return access token and refresh token to client
    res.json({ accessToken, user: exist });
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function logOut(req, res) {
  const token = req.cookies.refreshToken;

  // If no token is provided, send an error response
  if (!token) return res.sendStatus(204);
  try {
    const user = await client.user.findFirst({
      where: {
        refresh_token: token,
      },
    });
    if (!user) return res.status(204);
    await client.user.update({
      where: {
        id: user.id,
      },
      data: {
        refresh_token: null,
      },
    });
    res.clearCookie("refreshToken");
    res.status(200).json({ msg: "youre logged out" });
  } catch (error) {
    res.status(500).json({ msg: "server error" });
  }
}
