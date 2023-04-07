// export async function login2(req, res) {
//     try {
//       // Get email and password from request body
//       const { email, password } = req.body;

//       // Query database for user with given email
//       const user = await client.user.findUnique({
//         where: { email },
//       });

//       // If user is not found, return 404 status
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }

//       // Compare password hash with user's stored hash
//       const passwordMatch = await bcrypt.compare(password, user.password);

//       // If passwords do not match, return 401 status
//       if (!passwordMatch) {
//         return res.status(401).json({ message: "Invalid credentials" });
//       }

//       // Generate access token and refresh token
//       const accessToken = jwt.sign(
//         { email: user.email },
//         process.env.ACCESS_TOKEN_SECRET,
//         { expiresIn: "15m" }
//       );
//       const refreshToken = jwt.sign(
//         { email: user.email },
//         process.env.REFRESH_TOKEN_SECRET,
//         { expiresIn: "1h" }
//       );

//       // Update user's refresh token in the database
//       const updatedUser = await client.user.update({
//         where: { email },
//         data: { refresh_token: refreshToken },
//       });

//       // Return access token and refresh token to client
//       res.json({ accessToken, refreshToken });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Server error" });
//     }
//   }
