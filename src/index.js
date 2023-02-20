const express = require("express");
const PORT = 8080;
const routes = require("./routes");

const app = express();
app.use(express.json());
app.use(routes);

app.listen(PORT, () => console.log(`[INFO] : server running on ${PORT}`));
