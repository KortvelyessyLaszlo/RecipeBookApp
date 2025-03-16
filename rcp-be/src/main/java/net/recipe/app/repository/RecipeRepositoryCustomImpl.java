package net.recipe.app.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
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
}
