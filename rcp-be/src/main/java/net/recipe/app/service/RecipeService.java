package net.recipe.app.service;

import net.recipe.app.dto.RecipeFilter;
import net.recipe.app.entity.Recipe;

import java.util.List;

public interface RecipeService {
  List<Recipe> find(RecipeFilter recipeFilter);

  Recipe add(Recipe recipe);

  Recipe update(Long id, Recipe newRecipe);

  List<Recipe> findByUser();

  RecipeFilter getFilters();
}
