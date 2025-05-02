package net.recipe.app.repository;

import net.recipe.app.entity.Rating;
import net.recipe.app.entity.Recipe;
import net.recipe.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RatingRepository extends JpaRepository<Rating, Long> {
  Optional<Rating> findRatingByUserAndRecipe(User user, Recipe recipe);
}
