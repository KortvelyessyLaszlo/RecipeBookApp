package net.recipe.app.repository;

import net.recipe.app.entity.Recipe;
import net.recipe.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface RecipeRepository
    extends JpaRepository<Recipe, Long>, JpaSpecificationExecutor<Recipe> {
  List<Recipe> findByAuthor(User user);

  Recipe findTopByOrderByCreatedAtAsc();

  Recipe findTopByOrderByCreatedAtDesc();

  Recipe findTopByOrderByCookingTimeDesc();

  Recipe findTopByOrderByCookingTimeAsc();
}
