package net.recipe.app.repository;

import net.recipe.app.dto.RecipeFilter;
import net.recipe.app.entity.Ingredient;
import net.recipe.app.entity.Ingredient_;
import net.recipe.app.entity.Recipe;
import net.recipe.app.entity.Recipe_;
import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.SetJoin;

public class RecipeSpecification {

  public static Specification<Recipe> filterByRecipeFilter(RecipeFilter recipeFilter) {
    return (root, _, cb) -> {
      var predicate = cb.conjunction();

      if (recipeFilter.getCreatedFrom() != null) {
        predicate =
            cb.and(
                predicate,
                cb.greaterThanOrEqualTo(
                    root.get(Recipe_.createdAt), recipeFilter.getCreatedFrom()));
      }
      if (recipeFilter.getCreatedTo() != null) {
        predicate =
            cb.and(
                predicate,
                cb.lessThanOrEqualTo(root.get(Recipe_.createdAt), recipeFilter.getCreatedTo()));
      }
      if (recipeFilter.getCookingTimeFrom() != null) {
        predicate =
            cb.and(
                predicate,
                cb.greaterThanOrEqualTo(
                    root.get(Recipe_.cookingTime), recipeFilter.getCookingTimeFrom()));
      }
      if (recipeFilter.getCookingTimeTo() != null) {
        predicate =
            cb.and(
                predicate,
                cb.lessThanOrEqualTo(
                    root.get(Recipe_.cookingTime), recipeFilter.getCookingTimeTo()));
      }
      if (recipeFilter.getIngredientNames() != null
          && !recipeFilter.getIngredientNames().isEmpty()) {
        SetJoin<Recipe, Ingredient> ingredients = root.join(Recipe_.ingredients, JoinType.LEFT);
        predicate =
            cb.and(
                predicate, ingredients.get(Ingredient_.name).in(recipeFilter.getIngredientNames()));
      }

      return predicate;
    };
  }
}
