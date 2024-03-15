import { AppDataSource } from "./data-source";
import * as express from "express";
import routes from "./routes";
import cors = require("cors");

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    const PORT = 3000;

    const corsConfig: object = {
      origin: "http://localhost:5173",
    };

    app.use(cors(corsConfig));
    app.use(express.json());
    app.use("/api/v1", routes);

    app.listen(PORT, () => console.log("Successfully started"));
  })
  .catch((error) => console.log(error));
