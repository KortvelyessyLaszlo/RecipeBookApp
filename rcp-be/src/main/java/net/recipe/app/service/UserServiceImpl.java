package net.recipe.app.service;

import net.recipe.app.common.exception.ResourceNotFoundException;
import net.recipe.app.dto.UserDto;
import net.recipe.app.entity.User;
import net.recipe.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;
  private final ConversionService conversionService;

  @Autowired
  public UserServiceImpl(UserRepository userRepository, ConversionService conversionService) {
    this.userRepository = userRepository;
    this.conversionService = conversionService;
  }

  @Override
  public UserDto save(UserDto userDto) {
    User user = conversionService.convert(userDto, User.class);
    if (userRepository.findByUserName(Objects.requireNonNull(user).getUserName()) != null) {
      throw new DataIntegrityViolationException(
          "User already exists with username: " + user.getUserName());
    }
    return conversionService.convert(userRepository.save(user), UserDto.class);
  }

  @Override
  public void delete(Long userId) {
    userRepository
        .findById(userId)
        .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));
    userRepository.deleteById(userId);
  }

  @Override
  public UserDto findById(Long userId) {
    User user =
        userRepository
            .findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));
    return conversionService.convert(user, UserDto.class);
  }
}
