package net.recipe.app.converter.entitytodto;

import lombok.NonNull;
import org.springframework.core.convert.converter.Converter;
import net.recipe.app.dto.UserDto;
import net.recipe.app.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserToUserDto implements Converter<User, UserDto> {
  @Override
  public UserDto convert(@NonNull User user) {
    UserDto userDto = new UserDto();
    userDto.setId(user.getId());
    userDto.setUserName(user.getUserName());
    userDto.setPassword(user.getPassword());

    return userDto;
  }
}
