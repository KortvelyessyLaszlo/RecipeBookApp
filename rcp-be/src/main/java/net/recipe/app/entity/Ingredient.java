package net.recipe.app.entity;

import jakarta.persistence.Embeddable;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Embeddable
public class Ingredient {
  private String name;
  private String amount;
}
