const express = require("express");
const router = express.Router();
const recipeCtrl = require("../controllers/recipe");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/", auth, multer, recipeCtrl.createRecipe);
router.get("/", auth, recipeCtrl.getAllRecipes);
router.get("/:id", auth, recipeCtrl.getOneRecipe);
router.put("/:id", auth, multer, recipeCtrl.modifyRecipe);
router.delete("/:id", auth, recipeCtrl.deleteRecipe);

module.exports = router;
