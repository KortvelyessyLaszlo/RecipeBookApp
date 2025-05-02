package net.recipe.app.mapper;

import net.recipe.app.dto.UserDto;
import net.recipe.app.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
  @Mapping(target = "password", ignore = true)
  UserDto userToDto(User user);

  User dtoToUser(UserDto userDto);
}
