const express = require("express");
const app = express();
const cartRoutes = require("./routes/cartRoutes");

// Middleware
app.use(express.json());

// Routes
app.use("/cart", cartRoutes);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
