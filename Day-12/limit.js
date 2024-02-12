const express = require("express");
const app = express();
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
});

app.use(limiter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});