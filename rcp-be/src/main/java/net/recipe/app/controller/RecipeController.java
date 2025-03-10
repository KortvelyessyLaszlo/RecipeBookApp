package net.recipe.app.controller;

import lombok.RequiredArgsConstructor;
import net.recipe.app.dto.RecipeDto;
import net.recipe.app.dto.RecipeFilterDto;
import net.recipe.app.mapper.RecipeMapper;
import net.recipe.app.service.RecipeService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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

  @GetMapping
  public List<RecipeDto> find(@ModelAttribute RecipeFilterDto recipeFilter) {
    return service.find(recipeFilter).stream()
        .map(recipeMapper::recipeToDto)
        .collect(Collectors.toList());
  }

  @PostMapping
  public RecipeDto add(@RequestBody RecipeDto recipeDto) {
    return recipeMapper.recipeToDto(service.add(recipeMapper.dtoToRecipe(recipeDto)));
  }

  @PutMapping("/{id}")
  public RecipeDto update(@PathVariable Long id, @RequestBody RecipeDto recipeDto) {
    return recipeMapper.recipeToDto(service.update(id, recipeMapper.dtoToRecipe(recipeDto)));
  }
}
