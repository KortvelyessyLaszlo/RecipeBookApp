package net.recipe.app.dto;

import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String userName;
    private String password;
}
