package net.recipe.app.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;
import java.util.Set;

@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class RecipeDto {
  @EqualsAndHashCode.Include private Long id;
  private String title;
  private Set<IngredientDto> ingredients;
  private String instructions;
  private LocalDate createdAt;
  private byte[] image;
  private int cookingTime;
  private String author;
}
