package net.recipe.app.mapper;

import net.recipe.app.dto.UserDto;
import net.recipe.app.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
  UserDto userToDto(User user);

  User dtoToUser(UserDto userDto);
}
