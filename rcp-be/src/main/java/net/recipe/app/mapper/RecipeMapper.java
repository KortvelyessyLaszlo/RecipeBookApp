package net.recipe.app.mapper;

import net.recipe.app.dto.RecipeDto;
import net.recipe.app.entity.Recipe;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RecipeMapper {

  Recipe dtoToRecipe(RecipeDto recipeDto);

  RecipeDto recipeToDto(Recipe recipe);
}
