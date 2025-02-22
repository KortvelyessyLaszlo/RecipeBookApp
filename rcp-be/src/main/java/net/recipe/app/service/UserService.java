package net.recipe.app.service;

import net.recipe.app.dto.UserDto;

public interface UserService {
    UserDto save(UserDto userDto);
    void delete(Long userId);
    UserDto findById(Long userId);
}
