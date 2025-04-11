package net.recipe.app.repository;

import net.recipe.app.entity.Comment;
import net.recipe.app.entity.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
  List<Comment> findByRecipeId(Long recipeId);
}
