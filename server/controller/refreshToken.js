import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();
import jwt from "jsonwebtoken";

export async function refreshToken(req, res) {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.sendStatus(401);
    const user = await client.user.findFirst({
      where: {
        refresh_token: token,
      },
    });

    if (!user) return res.sendStatus(403);
    await jwt.verify(
      token,

      //eslint-disable-next-line
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.sendStatus(403);
        const { email, id } = user;
        const accessToken = jwt.sign(
          { email, id },
          //eslint-disable-next-line
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "15m",
          }
        );
        // console.log(accessToken);
        res.json({ accessToken });
      }
    );
  } catch (error) {
    res.sendStatus(500).json({ msg: "server error" });
  }
}
