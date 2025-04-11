package net.recipe.app.service;

import lombok.RequiredArgsConstructor;
import net.recipe.app.common.exception.ResourceNotFoundException;
import net.recipe.app.entity.Comment;
import net.recipe.app.entity.Recipe;
import net.recipe.app.entity.User;
import net.recipe.app.repository.CommentRepository;
import net.recipe.app.repository.RecipeRepository;
import net.recipe.app.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

  private final CommentRepository commentRepository;

  private final UserRepository userRepository;

  private final RecipeRepository recipeRepository;

  @Override
  public Comment add(Comment comment, Long recipeId) {
    String username =
        ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal())
            .getUsername();

    User user = userRepository.findByUsername(username);
    if (user == null) {
      throw new UsernameNotFoundException("User not found");
    }

    Recipe recipe = recipeRepository.findById(recipeId).orElse(null);
    if (recipe == null) {
      throw new ResourceNotFoundException("Recipe not found with ID: " + recipeId);
    }

    comment.setUser(user);
    comment.setRecipe(recipe);
    return commentRepository.save(comment);
  }

  @Override
  public List<Comment> findByRecipeId(Long recipeId) {
    return commentRepository.findByRecipeId(recipeId);
  }
}
