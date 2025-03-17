package net.recipe.app.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.*;
import net.recipe.app.dto.RecipeFilter;
import net.recipe.app.entity.Recipe;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RecipeRepositoryCustomImpl implements RecipeRepositoryCustom {

  @PersistenceContext private EntityManager entityManager;

  @Override
  public List<String> findIngredientNames() {
    CriteriaBuilder cb = entityManager.getCriteriaBuilder();
    CriteriaQuery<String> query = cb.createQuery(String.class);
    Root<Recipe> recipe = query.from(Recipe.class);
    query.select(recipe.join("ingredients").get("name"));
    return entityManager.createQuery(query).getResultList();
  }

  @Override
  public List<Recipe> findFilteredRecipes(RecipeFilter recipeFilter) {
    CriteriaBuilder cb = entityManager.getCriteriaBuilder();
    CriteriaQuery<Recipe> query = cb.createQuery(Recipe.class);
    Root<Recipe> recipe = query.from(Recipe.class);

    Predicate predicate = cb.conjunction();

    if (recipeFilter.getCreatedFrom() != null) {
      predicate =
          cb.and(
              predicate,
              cb.greaterThanOrEqualTo(recipe.get("createdAt"), recipeFilter.getCreatedFrom()));
    }
    if (recipeFilter.getCreatedTo() != null) {
      predicate =
          cb.and(
              predicate,
              cb.lessThanOrEqualTo(recipe.get("createdAt"), recipeFilter.getCreatedTo()));
    }
    if (recipeFilter.getCookingTimeFrom() != null) {
      predicate =
          cb.and(
              predicate,
              cb.greaterThanOrEqualTo(
                  recipe.get("cookingTime"), recipeFilter.getCookingTimeFrom()));
    }
    if (recipeFilter.getCookingTimeTo() != null) {
      predicate =
          cb.and(
              predicate,
              cb.lessThanOrEqualTo(recipe.get("cookingTime"), recipeFilter.getCookingTimeTo()));
    }
    if (recipeFilter.getIngredientNames() != null && !recipeFilter.getIngredientNames().isEmpty()) {
      Subquery<Long> subquery = query.subquery(Long.class);
      Root<Recipe> subRecipe = subquery.from(Recipe.class);
      Join<Object, Object> subIngredients = subRecipe.join("ingredients", JoinType.LEFT);
      subquery.select(cb.count(subRecipe.get("id")));
      subquery.where(
          cb.equal(subRecipe.get("id"), recipe.get("id")),
          subIngredients.get("name").in(recipeFilter.getIngredientNames()));

      predicate =
          cb.and(predicate, cb.equal(subquery, (long) recipeFilter.getIngredientNames().size()));
    }

    query.where(predicate);

    if (recipeFilter.getSortBy() != null) {
      switch (recipeFilter.getSortBy()) {
        case Title -> query.orderBy(cb.asc(recipe.get("title")));
        case Latest -> query.orderBy(cb.desc(recipe.get("createdAt")));
        case CookingTime -> query.orderBy(cb.asc(recipe.get("cookingTime")));
      }
    }

    return entityManager.createQuery(query).getResultList();
  }
}
