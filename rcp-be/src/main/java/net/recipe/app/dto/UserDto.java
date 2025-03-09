package net.recipe.app.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Set;

@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class UserDto {
  @EqualsAndHashCode.Include private Long id;
  private String username;
  private String password;
  private Set<String> roles;
}
