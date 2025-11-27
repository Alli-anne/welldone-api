javascriptimport express from "express";
import todo from "./route/listPath.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());
app.use("/", todo);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
