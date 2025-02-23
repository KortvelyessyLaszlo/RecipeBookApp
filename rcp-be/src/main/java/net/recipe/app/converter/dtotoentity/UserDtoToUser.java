package net.recipe.app.converter.dtotoentity;

import lombok.NonNull;
import net.recipe.app.dto.UserDto;
import net.recipe.app.entity.User;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class UserDtoToUser implements Converter<UserDto, User> {

  @Override
  public User convert(@NonNull UserDto source) {
    User user = new User();
    user.setId(source.getId());
    user.setUserName(source.getUserName());
    user.setPassword(source.getPassword());
    return user;
  }
}
