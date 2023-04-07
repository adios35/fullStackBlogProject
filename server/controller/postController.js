import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllPost(req, res) {
  const posts = await prisma.post.findMany();
  res.send({ posts });
}

// Get a specific user
export async function getPostByUserid(req, res) {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  res.json(user);
}

// Create a new post for a user

export async function createPost(req, res) {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const post = await prisma.post.create({
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
    });
    res.json(post);
  } catch (error) {
    res.sendStatus(500);
  }
}
