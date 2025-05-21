import express from "express";
import { dbConnect } from "./src/config/dbconfig.js";
import userRouter from "./src/routes/userRoute.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8001;

//DB Connection and Server status
dbConnect()
  .then(() => {
    /** ready to use. The `mongoose.connect()` promise resolves to mongoose
    instance. */
    app.listen(PORT, (error) => {
      return !error
        ? console.log(`server is running at http://localhost:${PORT}`)
        : console.log(error);
    });
  })
  .catch((error) => console.log(error));

// middleware
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => res.send("<h2>Client Api is up</h2>")); // To define a route handler for GET requests to the root URL ("/").

app.use("/api/v1/auth", userRouter);
