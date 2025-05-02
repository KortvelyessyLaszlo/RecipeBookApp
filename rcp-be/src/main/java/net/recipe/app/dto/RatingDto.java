package net.recipe.app.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class RatingDto {
  @EqualsAndHashCode.Include private Long id;
  private String user;
  private Long recipeId;
  private Integer value;
}
