package net.recipe.app.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Entity
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Recipe {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @EqualsAndHashCode.Include
  private Long id;

  private String title;

  @ElementCollection(fetch = FetchType.EAGER)
  private Set<Ingredient> ingredients;

  @Column(length = 10000)
  private String instructions;

  @ManyToOne private User author;

  @Temporal(TemporalType.DATE)
  private LocalDate createdAt;

  @Lob private byte[] image;

  private int cookingTime;

  @OneToMany(
      mappedBy = "recipe",
      cascade = CascadeType.ALL,
      orphanRemoval = true,
      fetch = FetchType.EAGER)
  private List<Comment> comments;

  @OneToMany(
      mappedBy = "recipe",
      cascade = CascadeType.ALL,
      orphanRemoval = true,
      fetch = FetchType.EAGER)
  private List<Rating> ratings;
}
