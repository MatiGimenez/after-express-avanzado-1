import Express from "express";
import users from "./users.js";
import { v4 } from "uuid";

const app = Express();
const PORT = 8000;

app.use(Express.json());

app.get("/", (_, res) => {
  res.json({ msg: "Bienvenidos al after!" });
});

app.get("/users", (_, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
  const newUser = {
    id: v4(),
    ...req.body,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id == id);
  res.json(user);
});

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, occupation, Hobbies } = req.body;
  const user = users.find((user) => user.id == id);
  if (!user) {
    return res.status(404).json({ msg: "Usuario no encontrado" });
  }
  (user.name = name), (user.occupation = occupation), (user.Hobbies = Hobbies);

  res.status(200).json(user);
});

app.patch("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, occupation, Hobbies } = req.body;
  const user = users.find((user) => user.id == id);

  if (!user) {
    return res.status(404).json({ msg: "Usuario no encontrado" });
  }

  user.name = name ? name : user.name;
  user.occupation = occupation ? occupation : user.occupation;
  user.Hobbies = Hobbies ? Hobbies : user.Hobbies;

  res.status(200).json(user);
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id == id);

  if (!user) {
    return res.status(404).json({ msg: "Usuario no encontrado" });
  }

  const index = users.findIndex((user) => user.id == id);
  users.splice(index, 1);

  res.status(200).end();
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
