import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { createAppError } from "../helpers";

const BASE_URL = process.env.API_BASE_URL;

type filterType = "ingredient" | "country" | "category";

const getRecipes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { filterType, filterValue } = req.query as {
      filterType?: filterType;
      filterValue?: string;
    };

    let url = `${BASE_URL}/search.php?s=`;

    if (filterType && filterValue) {
      switch (filterType) {
        case "ingredient":
          url = `${BASE_URL}/filter.php?i=${filterValue}`;
          break;
        case "country":
          url = `${BASE_URL}/filter.php?a=${filterValue}`;
          break;
        case "category":
          url = `${BASE_URL}/filter.php?c=${filterValue}`;
          break;
        default:
          throw createAppError("Invalid filter type", 400);
      }
    }

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    next(error);
  }
};

const getRecipeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const recipeId = req.params.id;
    const response = await axios.get(`${BASE_URL}/lookup.php?i=${recipeId}`);
    if (!response.data.meals) {
      throw createAppError("No recipe found", 404);
    }
    res.json(response.data);
  } catch (error) {
    next(error);
  }
};

export { getRecipes, getRecipeById };
