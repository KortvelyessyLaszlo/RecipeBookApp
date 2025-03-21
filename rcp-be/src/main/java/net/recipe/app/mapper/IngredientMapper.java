package net.recipe.app.mapper;

import net.recipe.app.dto.IngredientDto;
import net.recipe.app.dto.RecipeDto;
import net.recipe.app.entity.Ingredient;
import net.recipe.app.entity.Recipe;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface IngredientMapper {
  Ingredient dtoToIngredient(IngredientDto ingredientDto);

  IngredientDto ingredientToDto(Ingredient ingredient);
}
