const Recipe = require("../models/recipe");

exports.createRecipe = (req, res, next) => {
  const recipeObject = JSON.parse(req.body.recipe);
  delete recipeObject._id;
  delete recipeObject._userId;
  const recipe = new Recipe({
    ...recipeObject,
    userId: req.auth.userId,
    image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });
  recipe
    .save()
    .then(() => {
      res.status(201).json({ message: "Objet enregistré !" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.getAllRecipes = (req, res, next) => {
  Recipe.find()
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneRecipe = (req, res, next) => {
  Recipe.findOne({ _id: req.params.id })
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error }));
};

exports.modifyRecipe = (req, res, next) => {
  const recipeObject = req.file
    ? {
        ...JSON.parse(req.body.recipe),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  delete recipeObject._userId;
  Recipe.findOne({ _id: req.params.id })
    .then((recipe) => {
      if (recipe.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        Recipe.updateOne(
          { _id: req.params.id },
          { ...recipeObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Objet modifié!" }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.deleteRecipe = (req, res, next) => {
  Recipe.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};
