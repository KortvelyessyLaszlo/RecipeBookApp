package net.recipe.app.controller;

import lombok.RequiredArgsConstructor;
import net.recipe.app.dto.RatingDto;
import net.recipe.app.dto.RecipeDto;
import net.recipe.app.dto.RecipeFilter;
import net.recipe.app.entity.Rating;
import net.recipe.app.mapper.RatingMapper;
import net.recipe.app.mapper.RecipeMapper;
import net.recipe.app.service.RecipeService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/recipe")
@RequiredArgsConstructor
public class RecipeController {
  private final RecipeService service;

  private final RecipeMapper recipeMapper;

  private final RatingMapper ratingMapper;

  @GetMapping
  public Page<RecipeDto> find(@ModelAttribute RecipeFilter recipeFilter, Pageable pageable) {
    return service.find(recipeFilter, pageable).map(recipeMapper::recipeToDto);
  }

  @GetMapping("/{id}")
  public RecipeDto findById(@PathVariable Long id) {
    return recipeMapper.recipeToDto(service.findById(id));
  }

  @PostMapping
  public RecipeDto add(@RequestBody RecipeDto recipeDto) {
    return recipeMapper.recipeToDto(service.add(recipeMapper.dtoToRecipe(recipeDto)));
  }

  @PutMapping("/{id}")
  public RecipeDto update(@PathVariable Long id, @RequestBody RecipeDto recipeDto) {
    return recipeMapper.recipeToDto(service.update(id, recipeMapper.dtoToRecipe(recipeDto)));
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable Long id) {
    service.delete(id);
  }

  @GetMapping("/myrecipes")
  public List<RecipeDto> findByUser() {
    return service.findByUser().stream()
        .map(recipeMapper::recipeToDto)
        .collect(Collectors.toList());
  }

  @GetMapping("/{id}/rating")
  public double getRating(@PathVariable Long id) {
    return service.findById(id).getRatings().stream()
        .mapToInt(Rating::getValue)
        .average()
        .orElse(0);
  }

  @PutMapping("/{id}/rating")
  public RatingDto addRating(@PathVariable Long id, @RequestBody Integer value) {
    return ratingMapper.ratingToDto(service.upsertRating(id, value));
  }

  @GetMapping("/filters")
  public RecipeFilter getFilters() {
    return service.getFilters();
  }

  @GetMapping("/ingredients")
  public Set<String> getIngredients() {
    return service.getIngredients();
  }
}
