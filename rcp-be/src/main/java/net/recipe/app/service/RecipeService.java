package net.recipe.app.service;

import net.recipe.app.dto.RecipeFilterDto;
import net.recipe.app.entity.Recipe;

import java.util.List;

public interface RecipeService {
  List<Recipe> find(RecipeFilterDto recipeFilter);

  Recipe add(Recipe recipe);

  Recipe update(Long id, Recipe newRecipe);
}
