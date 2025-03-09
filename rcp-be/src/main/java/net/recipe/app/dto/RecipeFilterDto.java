package net.recipe.app.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.util.Set;

@Data
public class RecipeFilterDto {
  private LocalDate createdFrom;
  private LocalDate createdTo;
  private Set<String> ingredientNames;
  private Integer cookingTimeFrom;
  private Integer cookingTimeTo;
}
