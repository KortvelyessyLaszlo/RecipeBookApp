package net.recipe.app.service;

import lombok.RequiredArgsConstructor;
import net.recipe.app.dto.RecipeFilter;
import net.recipe.app.entity.Recipe;
import net.recipe.app.entity.User;
import net.recipe.app.repository.RecipeRepository;
import net.recipe.app.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.TreeSet;

@Service
@RequiredArgsConstructor
public class RecipeServiceImpl implements RecipeService {

  private final RecipeRepository recipeRepository;

  private final UserRepository userRepository;

  @Override
  public List<Recipe> find(RecipeFilter recipeFilter) {
    return recipeRepository.findFilteredRecipes(recipeFilter);
  }

  @Override
  public Recipe add(Recipe recipe) {
    String username =
        ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal())
            .getUsername();

    User user = userRepository.findByUsername(username);
    if (user == null) {
      throw new UsernameNotFoundException("User not found");
    }

    recipe.setAuthor(user);
    recipe.setCreatedAt(LocalDate.now());

    return recipeRepository.save(recipe);
  }

  @Override
  public Recipe update(Long id, Recipe newRecipe) {
    String username =
        ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal())
            .getUsername();

    User user = userRepository.findByUsername(username);
    if (user == null) {
      throw new UsernameNotFoundException("User not found");
    }

    Recipe recipe =
        recipeRepository.findById(id).orElseThrow(() -> new RuntimeException("Recipe not found"));

    if (!recipe.getAuthor().equals(user)) {
      throw new RuntimeException("You are not authorized to edit this recipe");
    }

    recipe.setTitle(newRecipe.getTitle());
    recipe.setIngredients(newRecipe.getIngredients());
    recipe.setInstructions(newRecipe.getInstructions());
    recipe.setCookingTime(newRecipe.getCookingTime());
    recipe.setImage(newRecipe.getImage());

    return recipeRepository.save(recipe);
  }

  @Override
  public List<Recipe> findByUser() {
    String username =
        ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal())
            .getUsername();

    User user = userRepository.findByUsername(username);
    if (user == null) {
      throw new UsernameNotFoundException("User not found");
    }

    return recipeRepository.findByAuthor(user);
  }

  @Override
  public RecipeFilter getFilters() {
    RecipeFilter recipeFilter = new RecipeFilter();
    recipeFilter.setIngredientNames(new TreeSet<>(recipeRepository.findIngredientNames()));
    recipeFilter.setCreatedFrom(recipeRepository.findTopByOrderByCreatedAtAsc().getCreatedAt());
    recipeFilter.setCreatedTo(recipeRepository.findTopByOrderByCreatedAtDesc().getCreatedAt());
    recipeFilter.setCookingTimeFrom(
        recipeRepository.findTopByOrderByCookingTimeAsc().getCookingTime());
    recipeFilter.setCookingTimeTo(
        recipeRepository.findTopByOrderByCookingTimeDesc().getCookingTime());
    return recipeFilter;
  }
}
