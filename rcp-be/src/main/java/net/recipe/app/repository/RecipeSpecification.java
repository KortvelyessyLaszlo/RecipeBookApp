package net.recipe.app.repository;

import jakarta.persistence.criteria.*;
import net.recipe.app.dto.RecipeFilter;
import net.recipe.app.entity.*;
import org.springframework.data.jpa.domain.Specification;

public class RecipeSpecification {

  public static Specification<Recipe> filterByRecipeFilter(RecipeFilter recipeFilter) {
    return (root, query, cb) -> {
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
      if (recipeFilter.getMinRating() != null) {
        assert query != null;
        Subquery<Double> avgRatingSubquery = query.subquery(Double.class);
        Root<Recipe> subRoot = avgRatingSubquery.from(Recipe.class);
        Join<Recipe, Rating> ratingsJoin = subRoot.join(Recipe_.ratings, JoinType.LEFT);

        Expression<Double> avgRatingExpression =
            cb.coalesce(cb.avg(ratingsJoin.get(Rating_.value)), 0.0);

        avgRatingSubquery
            .select(avgRatingExpression)
            .where(cb.equal(subRoot.get(Recipe_.id), root.get(Recipe_.id)));

        predicate =
            cb.and(
                predicate, cb.greaterThanOrEqualTo(avgRatingSubquery, recipeFilter.getMinRating()));
      }
      if (recipeFilter.getSearchTerm() != null) {
        predicate =
            cb.and(
                predicate,
                cb.or(
                    cb.like(
                        cb.lower(root.get(Recipe_.title)),
                        "%" + recipeFilter.getSearchTerm() + "%"),
                    cb.like(
                        cb.lower(root.get(Recipe_.author).get(User_.username)),
                        "%" + recipeFilter.getSearchTerm() + "%")));
      }

      return predicate;
    };
  }
}
