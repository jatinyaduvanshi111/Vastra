import app from "./src/app.js";

const PORT = 5000;

app.listen(PORT, () => {
  console.log("✅ Vastra backend running on port " + PORT);
});