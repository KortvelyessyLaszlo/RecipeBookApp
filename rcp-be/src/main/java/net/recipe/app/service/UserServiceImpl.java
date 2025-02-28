package net.recipe.app.service;

import lombok.RequiredArgsConstructor;
import net.recipe.app.common.exception.ResourceNotFoundException;
import net.recipe.app.entity.User;
import net.recipe.app.repository.UserRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;

  @Override
  public User save(User user) {
    if (userRepository.findByUsername(Objects.requireNonNull(user).getUsername()) != null) {
      throw new DataIntegrityViolationException(
          "User already exists with username: " + user.getUsername());
    }
    return userRepository.save(user);
  }

  @Override
  public void delete(Long userId) {
    userRepository
        .findById(userId)
        .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));
    userRepository.deleteById(userId);
  }

  @Override
  public User findById(Long userId) {
    return userRepository
        .findById(userId)
        .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));
  }
}
