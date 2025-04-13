import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "../api/axios";
import {
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  List,
  ListItemText,
  Divider,
  ListItemButton,
} from "@mui/material";
import { type Recipe } from "../types/types";

const RecipeInfoPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [relatedRecipes, setRelatedRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const result = await axios.get(`/recipes/${id}`);
        const fetchedRecipe = result.data.meals[0];
        setRecipe(fetchedRecipe);

        if (fetchedRecipe?.strCategory) {
          const related = await axios.get("/recipes", {
            params: {
              filterType: "category",
              filterValue: fetchedRecipe.strCategory,
            },
          });
          setRelatedRecipes(related.data.meals || []);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) return <Typography>Loading...</Typography>;

  const ingredients = Object.keys(recipe)
    .filter((key) => key.includes("strIngredient") && recipe[key])
    .map((key) => recipe[key]);

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={{ sm: 2, md: 5 }}>
        <Grid size={{ sm: 12, md: 8 }}>
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
          />

          <Typography variant="h3" mt={2}>
            {recipe.strMeal}
          </Typography>

          <Typography
            variant="h6"
            sx={{ cursor: "pointer", color: "blue", mb: 2 }}
            onClick={() => navigate(`/recipes?filterType=country&filterValue=${recipe.strArea}`)}
          >
            {recipe.strArea}
          </Typography>

          <Typography variant="h5" mt={2} gutterBottom>
            Instructions:
          </Typography>
          <Typography variant="body1">{recipe.strInstructions}</Typography>

          <Typography variant="h5" mt={3}>
            Ingredients:
          </Typography>
          <List component="ol">
            {ingredients.map((ingredient: string, index: number) => (
              <ListItemButton
                key={index}
                onClick={() => navigate(`/recipes?filterType=ingredient&filterValue=${ingredient}`)}
              >
                <ListItemText primary={ingredient} />
              </ListItemButton>
            ))}
          </List>
        </Grid>

        <Grid size={{ sm: 6, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Category:{" "}
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() =>
                    navigate(`/recipes?filterType=category&filterValue=${recipe.strCategory}`)
                  }
                  sx={{ ml: 1 }}
                >
                  {recipe.strCategory}
                </Button>
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" gutterBottom>
                More in "{recipe.strCategory}"
              </Typography>

              <List dense>
                {relatedRecipes
                  .filter((r) => r.idMeal !== recipe.idMeal)
                  .map((r) => (
                    <ListItemButton key={r.idMeal} onClick={() => navigate(`/recipes/${r.idMeal}`)}>
                      <ListItemText primary={r.strMeal} />
                    </ListItemButton>
                  ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RecipeInfoPage;
