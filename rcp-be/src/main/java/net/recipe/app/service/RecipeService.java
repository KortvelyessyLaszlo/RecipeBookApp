package net.recipe.app.service;

import net.recipe.app.dto.RecipeFilter;
import net.recipe.app.entity.Recipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Set;

public interface RecipeService {
  Page<Recipe> find(RecipeFilter recipeFilter, Pageable pageable);

  Recipe findById(Long id);

  Recipe add(Recipe recipe);

  Recipe update(Long id, Recipe newRecipe);

  List<Recipe> findByUser();

  RecipeFilter getFilters();

  Set<String> getIngredients();

  void delete(Long id);
}
