package net.recipe.app.mapper;

import net.recipe.app.dto.RecipeDto;
import net.recipe.app.entity.Recipe;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RecipeMapper {

  @Mapping(source = "author.username", target = "author")
  RecipeDto recipeToDto(Recipe recipe);

  @Mapping(target = "author", ignore = true)
  Recipe dtoToRecipe(RecipeDto recipeDto);
}
