const express = require("express");
const users = require("./USERS"); 
const products = require("./PRODUCTS");

const app = express();

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get("/users", (req, res) => {
    res.send(users);
});

app.get("/user/:id", (req, res) => {
    try {
        const userId = parseInt(req.params.id);

        // Find the user with the given ID
        const user = users.find((u) => u.id === userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error("Error retrieving user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.post("/user", (req, res) => {
    try {
        console.log("body: ", req.body);
        const { username, email, password } = req.body;

        // Create a new user object
        const newUser = {
            id: users.length + 1,
            username,
            email,
            password,
        };

        // Add the new user to the USERS.js array
        users.push(newUser);

        // Send the updated users array as a response (you can modify this based on your needs)
        res.status(200).json({ message: "User added successfully", newUser });
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get("/products", (req, res) => {
    res.send(products);
})

app.get("/product/:id", (req, res) => {
    try {
        const productId = parseInt(req.params.id);

        // Find the product with the given ID
        const product = products.find((p) => p.id === productId);

        if (!product) {
            return res.status(404).json({ message: "product not found" });
        }

        res.status(200).json({ product });
    } catch (error) {
        console.error("Error retrieving product:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
