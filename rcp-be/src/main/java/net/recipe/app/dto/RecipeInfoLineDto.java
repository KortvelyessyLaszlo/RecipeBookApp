package net.recipe.app.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;

@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class RecipeInfoLineDto {
  @EqualsAndHashCode.Include private Long id;
  private String title;
  private LocalDate createdAt;
  private String author;
}
