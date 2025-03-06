package net.recipe.app.dto;

import lombok.Data;

import java.util.Set;

@Data
public class UserDto {
  private Long id;
  private String username;
  private String password;
  private Set<String> roles;
}
