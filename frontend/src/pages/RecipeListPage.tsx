import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import {
  Container,
  Grid,
  Typography,
  CardMedia,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";
import axios from "../api/axios";

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

const RecipeListPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [recipes, setRecipes] = useState([]);

  const filterType = searchParams.get("filterType");
  const filterValue = searchParams.get("filterValue");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const result = await axios.get(`/recipes`, {
          params: filterType && filterValue ? { filterType, filterValue } : {},
        });
        setRecipes(result.data.meals || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipes();
  }, [filterType, filterValue]);

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        {filterType && filterValue
          ? `Recipes filtered by ${filterType}: ${filterValue}`
          : "All Recipes"}
      </Typography>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {recipes.map((recipe: Recipe) => (
          <Grid key={recipe.idMeal} size={{ xs: 2, sm: 4, md: 4 }}>
            <Card>
              <CardActionArea onClick={() => navigate(`/recipes/${recipe.idMeal}`)}>
                <CardMedia
                  component="img"
                  height="200"
                  image={recipe.strMealThumb}
                  alt={recipe.strMeal}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {recipe.strMeal}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RecipeListPage;
