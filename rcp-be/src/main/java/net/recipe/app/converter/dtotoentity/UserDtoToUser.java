package net.recipe.app.converter.dtotoentity;

import lombok.NonNull;
import net.recipe.app.dto.UserDto;
import net.recipe.app.entity.User;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class UserDtoToUser implements Converter<UserDto, User> {

    @Override
    public @NonNull User convert(UserDto source) {
        User user = new User();
        user.setId(source.getId());
        user.setFirstName(source.getFirstName());
        user.setLastName(source.getLastName());
        user.setEmail(source.getEmail());
        user.setPassword(source.getPassword());
        return user;
    }
}
