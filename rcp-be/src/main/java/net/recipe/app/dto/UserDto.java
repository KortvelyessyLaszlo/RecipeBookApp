package net.recipe.app.dto;

import lombok.Data;

@Data
public class UserDto {
  private Long id;
  private String username;
  private String password;
}
