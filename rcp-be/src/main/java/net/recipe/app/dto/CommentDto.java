package net.recipe.app.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;

@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class CommentDto {
  @EqualsAndHashCode.Include private Long id;
  private String text;
  private String user;
  private LocalDate createdAt;
}
