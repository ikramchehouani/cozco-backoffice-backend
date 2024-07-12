const express = require("express");
const router = express.Router();
const articleController = require("../../controller/article/articleController");
const verifyToken = require("../../middleware/verifyToken");
const checkRole = require("../../middleware/checkRole");

router.get("/", articleController.getAllArticles);
router.get("/article/:id", articleController.getArticle);

router.post("/article", articleController.createArticle);
router.put("/article/:id", articleController.updateArticle);
router.delete("/article/:id", articleController.deleteArticle);

module.exports = router;
