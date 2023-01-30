const Router = require('express').Router;

const routerAll = Router();

routerAll.get("/", async (req, res) => {
  const all = await getAll();
  res.status(200).json(all);
});

module.exports = routerAll;
