package net.recipe.app.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Rating {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @EqualsAndHashCode.Include
  private Long id;

  @ManyToOne(optional = false)
  private User user;

  @ManyToOne(optional = false)
  private Recipe recipe;

  @Column(nullable = false)
  private Integer value;

  public void setValue(Integer value) {
    if (value != null && (value < 1 || value > 5)) {
      throw new IllegalArgumentException("Rating must be between 1 and 5");
    }
    this.value = value;
  }
}
