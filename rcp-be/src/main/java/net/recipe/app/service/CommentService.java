package net.recipe.app.service;

import net.recipe.app.entity.Comment;
import net.recipe.app.entity.Recipe;

import java.util.List;

public interface CommentService {
  Comment add(Comment comment, Long recipeId);

  List<Comment> findByRecipeId(Long recipeId);
}
