// import multer from "multer";
// import { fileURLToPath } from "url";
// import { dirname } from "path";
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
  // const image = req.files.image || null;
  // console.log(req.files);
  // console.log(title, content);

  try {
    if (req.files) {
      const data = await cloudinary.uploader
        .upload(req.files.image.tempFilePath, {
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
    } else {
      const post = await prisma.post
        .create({
          data: {
            title,
            content,
            authorId: id,
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
    }
  } catch (error) {
    res.sendStatus(500);
  }
  // res.send({ message: "lol" });
}

// Update an existing post
export async function editPost(req, res) {
  const { id } = req.params;
  const { title, content } = req.body;
  // const image = req?.files?.image;
  // const post = await prisma.post.findUnique({
  //   where: { id },
  // });

  try {
    if (req.files) {
      // const publicId = post.image.split("/").slice(-1)[0].split(".")[0];
      // await cloudinary.uploader.destroy(publicId);

      const data = await cloudinary.uploader
        .upload(req.files.image.tempFilePath, {
          public_id: Date.now(),
          resource_type: "auto",
          folder: "posts",
        })
        .catch((err) => {
          console.log(err);
          res.send(err);
        });

      await prisma.post.update({
        where: { id },
        data: { title, content, image: data.url },
      });
    } else {
      await prisma.post.update({
        where: { id },
        data: { title, content },
      });
    }
    const updatedPost = await prisma.post.findFirst({
      where: { id },
      include: { author: true },
    });
    res.json(updatedPost);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function deletePost(req, res) {
  const { id } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });
    if (post.image) {
      const publicId = post.image.match(/\/([^/]+)\.\w{3,4}$/)[1];
      await cloudinary.uploader.destroy("posts/" + publicId).catch((err) => {
        console.log(err);
      });
    }

    await prisma.post
      .delete({
        where: {
          id,
        },
      })
      .catch((err) => {
        console.log(err);
      });
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
}
