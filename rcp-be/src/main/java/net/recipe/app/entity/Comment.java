package net.recipe.app.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;

@Entity
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Comment {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @EqualsAndHashCode.Include
  private Long id;

  @ManyToOne(optional = false)
  private User user;

  @ManyToOne(optional = false)
  private Recipe recipe;

  @Column(nullable = false, length = 1000)
  private String text;

  @Temporal(TemporalType.DATE)
  private LocalDate createdAt;
}
