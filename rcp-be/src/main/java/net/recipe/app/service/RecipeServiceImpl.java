package net.recipe.app.service;

import lombok.RequiredArgsConstructor;
import net.recipe.app.common.exception.ResourceNotFoundException;
import net.recipe.app.dto.RecipeFilter;
import net.recipe.app.entity.Ingredient;
import net.recipe.app.entity.Rating;
import net.recipe.app.entity.Recipe;
import net.recipe.app.entity.User;
import net.recipe.app.repository.RatingRepository;
import net.recipe.app.repository.RecipeRepository;
import net.recipe.app.repository.RecipeSpecification;
import net.recipe.app.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.TreeSet;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecipeServiceImpl implements RecipeService {

  private final RecipeRepository recipeRepository;

  private final UserRepository userRepository;

  private final RatingRepository ratingRepository;

  @Override
  public Page<Recipe> find(RecipeFilter recipeFilter, Pageable pageable) {
    Sort.Order ratingOrder = pageable.getSort().getOrderFor("rating");

    if (ratingOrder != null) {
      Page<Recipe> page =
          recipeRepository.findAll(
              RecipeSpecification.filterByRecipeFilter(recipeFilter),
              PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.unsorted()));

      List<Recipe> sortedContent =
          page.getContent().stream()
              .sorted(
                  (r1, r2) -> {
                    double avg1 =
                        r1.getRatings().stream().mapToInt(Rating::getValue).average().orElse(0);
                    double avg2 =
                        r2.getRatings().stream().mapToInt(Rating::getValue).average().orElse(0);
                    return ratingOrder.getDirection() == Sort.Direction.DESC
                        ? Double.compare(avg2, avg1)
                        : Double.compare(avg1, avg2);
                  })
              .toList();

      return new PageImpl<>(sortedContent, pageable, page.getTotalElements());
    }

    return recipeRepository.findAll(
        RecipeSpecification.filterByRecipeFilter(recipeFilter), pageable);
  }

  @Override
  public Recipe findById(Long id) {
    return recipeRepository
        .findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Recipe with id " + id + " not found"));
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
    Recipe recipe = getRecipeById(id);

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
    recipeFilter.setIngredientNames(getIngredients());
    recipeFilter.setCreatedFrom(recipeRepository.findTopByOrderByCreatedAtAsc().getCreatedAt());
    recipeFilter.setCreatedTo(recipeRepository.findTopByOrderByCreatedAtDesc().getCreatedAt());
    recipeFilter.setCookingTimeFrom(
        recipeRepository.findTopByOrderByCookingTimeAsc().getCookingTime());
    recipeFilter.setCookingTimeTo(
        recipeRepository.findTopByOrderByCookingTimeDesc().getCookingTime());
    return recipeFilter;
  }

  @Override
  public Set<String> getIngredients() {
    Set<String> ingredients = new TreeSet<>();
    recipeRepository
        .findAll()
        .forEach(
            recipe ->
                ingredients.addAll(
                    recipe.getIngredients().stream()
                        .map(Ingredient::getName)
                        .collect(Collectors.toSet())));
    return ingredients;
  }

  @Override
  public void delete(Long id) {
    Recipe recipe = getRecipeById(id);

    recipe.getAuthor().getRecipes().remove(recipe);
    userRepository.save(recipe.getAuthor());
  }

  @Override
  public Rating upsertRating(Long id, Integer value) {

    String username =
        ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal())
            .getUsername();

    User user = userRepository.findByUsername(username);
    if (user == null) {
      throw new UsernameNotFoundException("User not found");
    }

    Recipe recipe =
        recipeRepository
            .findById(id)
            .orElseThrow(
                () -> new ResourceNotFoundException("Recipe with id " + id + " not found"));

    Optional<Rating> existingRating = ratingRepository.findRatingByUserAndRecipe(user, recipe);

    if (existingRating.isPresent()) {
      Rating rating = existingRating.get();
      rating.setValue(value);
      return ratingRepository.save(rating);
    }

    Rating rating = new Rating();
    rating.setUser(user);
    rating.setRecipe(recipe);
    rating.setValue(value);
    recipe.getRatings().add(rating);
    recipeRepository.save(recipe);
    return rating;
  }

  @Override
  public List<Recipe> findAll() {
    return recipeRepository.findAll();
  }

  @Override
  public void deleteByAdmin(Long recipeId) {
    Recipe recipe =
        recipeRepository
            .findById(recipeId)
            .orElseThrow(() -> new ResourceNotFoundException("Recipe not found"));
    recipe.getAuthor().getRecipes().remove(recipe);
    userRepository.save(recipe.getAuthor());
  }

  private Recipe getRecipeById(Long id) {
    String username =
        ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal())
            .getUsername();

    User user = userRepository.findByUsername(username);
    if (user == null) {
      throw new UsernameNotFoundException("User not found");
    }

    Recipe recipe =
        recipeRepository
            .findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Recipe not found"));

    if (!recipe.getAuthor().equals(user)) {
      throw new RuntimeException("You are not authorized to modify this recipe");
    }
    return recipe;
  }
}
