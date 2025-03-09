package net.recipe.app.entity;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class Ingredient {
  private String name;
  private String amount;
}
