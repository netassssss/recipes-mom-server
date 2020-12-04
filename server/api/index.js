const express = require('express');

const setRecipe = require('./recipes/set-recipe.post');
const getRecipes = require('./recipes/recipes.get');
const getTitles = require('./recipes/titles.get');
const getRecipeById = require('./recipes/recipe-by-id.get');

const startDB = require('../db/firebase');

const getAdminDB = fn => (...args) => fn([...args, startDB.db]);

const router = express.Router();

router.post('/set-recipe', getAdminDB(setRecipe));
router.get('/get-recipes', getAdminDB(getRecipes));
router.get('/get-titles', getAdminDB(getTitles));
router.post('/get-recipe-by-id', getAdminDB(getRecipeById));

module.exports = router; // exporting router so that it can be used in app.js
