import express from "express";
import logger from "morgan";

import router from "./route/route.js";

const app = express();

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});


const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(express.json());

app.use("/test-obj", router);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

export default app;
