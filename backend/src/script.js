import express from "express";
import cors from 'cors';
import EventController from "./controllers/EventController.js"
import ProvinceController from "./controllers/ProvinceController.js"
import UsersController from "./controllers/UsersController.js"
import LocationController from "./controllers/LocationController.js"
import EventLocationController from "./controllers/EventLocationController.js"
import EventCategoryController from "./controllers/EventCategoriesController.js"
import { BDConfig } from "./BD/bd.js";

const app = express();
app.use(cors());
const port = 5000;

app.use("/api/event", EventController);
app.use("/api/province", ProvinceController);
app.use("/api/user", UsersController);
app.use("/api/location", LocationController);
app.use("/api/event-location", EventLocationController);
app.use("/api/event-category", EventCategoryController);

const server = app.listen(port, () => {
    console.log(`API corriendo en http://localhost:${port}`);
});
server.timeout = 10000; // 10 segundos de timeout