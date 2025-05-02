package net.recipe.app.mapper;

import net.recipe.app.dto.RatingDto;
import net.recipe.app.entity.Rating;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface RatingMapper {

  @Mapping(source = "user.username", target = "user")
  @Mapping(source = "recipe.id", target = "recipeId")
  RatingDto ratingToDto(Rating rating);
}
