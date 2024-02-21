const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const secret = "shhhhhhared-secret";

class AuthController {
    static async loginUser(req, res) {
        try {
            // Fetch users data from external source
            const users = await fetch("http://localhost:3005/users").then(
                (response) => response.json()
            );

            // Replace this with actual login logic
            const user = users.find((u) => u.username === req.body.username);

            if (!user) {
                return res.status(401).send({
                    accessToken: null,
                    message: "User not found!",
                });
            }

            // Comparing passwords
            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            // Checking if password is valid and send response accordingly
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!",
                });
            }

            // Signing token with user id
            const token = jwt.sign(
                {
                    id: user.id,
                },
                secret,
                {
                    expiresIn: 86400,
                }
            );

            res.status(200).send({
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                },
                message: "Login successful",
                accessToken: token,
            });
        } catch (error) {
            console.error("Error during login:", error);
            res.status(500).send({ message: "Internal Server Error" });
        }
    }

    static async signupUser(req, res) {
        try {
            const { username, email, password } = req.body;

            // Hash the password
            const hashedPassword = bcrypt.hashSync(password, 10);

            // Create a new user object
            const newUser = {
                username,
                email,
                password: hashedPassword,
            };

            console.log("New user: ", JSON.stringify(newUser));

            // Send the new user data to the external endpoint
            const response = await fetch("http://localhost:3005/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            });

            if (!response.ok) {
                console.error(
                    "Error creating user on external endpoint:",
                    response.statusText
                );
                return res
                    .status(500)
                    .send({ message: "Internal Server Error" });
            }

            const responseData = await response.json();

            // You can handle the response data as needed
            console.log(
                "User created successfully on external endpoint:",
                responseData
            );

            res.status(201).send({
                user: responseData.newUser,
                message: "Signup successful",
            });
        } catch (error) {
            console.error("Error during signup:", error);
            res.status(500).send({ message: "Internal Server Error" });
        }
    }

    static async validateUser(req, res) {
        try {
            const accessToken = req.headers.authorization;

            if (!accessToken) {
                return res.status(401).send({
                    message: "Access token is missing!",
                });
            }

            // Verify the token
            jwt.verify(accessToken, secret, (err, decoded) => {
                if (err) {
                    return res.status(401).send({
                        message: "Invalid access token!",
                    });
                }

                // At this point, the token is valid
                // You can use the decoded information to retrieve user details from your system
                const userId = decoded.id;

                // Fetch user data based on the user ID (replace this with your logic)
                const user = getUserById(userId);

                if (!user) {
                    return res.status(404).send({
                        message: "User not found!",
                    });
                }

                res.status(200).send({
                    user: {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                    },
                    message: "User is valid!",
                });
            });
        } catch (error) {
            console.error("Error during validation:", error);
            res.status(500).send({ message: "Internal Server Error" });
        }
        next();
    }
}

// Dummy function to get user by ID (replace with your actual logic)
async function getUserById(userId) {
    try {
        const response = await fetch(`http://localhost:3005/user/${userId}`);

        if (!response.ok) {
            console.error(
                `Error fetching user with ID ${userId}: ${response.statusText}`
            );
            return null;
        }

        const user = await response.json();
        return user;
    } catch (error) {
        console.error(`Error fetching user with ID ${userId}:`, error);
        return null;
    }
}

module.exports = AuthController;
