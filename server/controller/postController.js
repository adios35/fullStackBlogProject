import multer from "multer";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { PrismaClient } from "@prisma/client";
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

const prisma = new PrismaClient();

export async function getAllPost(req, res) {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        select: {
          email: true,
          id: true,
        },
      },
    },
  });
  res.send({ posts });
}

// Get a specific user
export async function getPostByUserid(req, res) {
  const { id } = req.params;
  const post = await prisma.post.findFirst({
    where: {
      id,
    },
    include: {
      author: {
        select: {
          email: true,
          id: true,
        },
      },
    },
  });
  res.json(post);
}

// Create a new post for a user

export async function createPost(req, res) {
  const { id } = req.params;
  const { title, content } = req.body;
  const file = req.files.image;
  console.log(file && file);
  console.log(title, content);

  try {
    const data = await cloudinary.uploader
      .upload(file.tempFilePath, {
        public_id: Date.now(),
        resource_type: "auto",
        folder: "posts",
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
    // res.send(data);
    const post = await prisma.post
      .create({
        data: {
          title,
          content,
          authorId: id,
          image: data.url,
          // author: {
          //   connect: {
          //     id,
          //   },
          // },
        },
      })
      .catch((err) => {
        console.log(err);
      });
    res.json(post);
  } catch (error) {
    res.sendStatus(500);
  }
}
