package net.recipe.app.repository;

import net.recipe.app.dto.RecipeFilter;
import net.recipe.app.entity.Recipe;

import java.util.List;

public interface RecipeRepositoryCustom {
  List<String> findIngredientNames();

  List<Recipe> findFilteredRecipes(RecipeFilter recipeFilter);
}
