package net.recipe.app.mapper;

import net.recipe.app.dto.RecipeInfoLineDto;
import net.recipe.app.entity.Recipe;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RecipeInfoLineMapper {

  @Mapping(source = "author.username", target = "author")
  RecipeInfoLineDto recipeToDto(Recipe recipe);
}
