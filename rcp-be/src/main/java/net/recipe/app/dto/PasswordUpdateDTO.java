package net.recipe.app.dto;

import lombok.Data;

@Data
public class PasswordUpdateDTO {
  private String currentPassword;
  private String newPassword;
}
