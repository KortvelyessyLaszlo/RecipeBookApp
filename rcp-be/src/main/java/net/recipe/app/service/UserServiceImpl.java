package net.recipe.app.service;

import lombok.RequiredArgsConstructor;
import net.recipe.app.common.exception.ResourceNotFoundException;
import net.recipe.app.entity.Comment;
import net.recipe.app.entity.Rating;
import net.recipe.app.entity.User;
import net.recipe.app.repository.UserRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  @Override
  public void save(User user) {
    if (userRepository.findByUsername(Objects.requireNonNull(user).getUsername()) != null) {
      throw new DataIntegrityViolationException(
          "User already exists with username: " + user.getUsername());
    }
    userRepository.save(user);
  }

  @Override
  @Transactional
  public void delete(Long userId) {
    User user =
        userRepository
            .findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));

    for (Rating rating : new HashSet<>(user.getRatings())) {
      rating.getRecipe().getRatings().remove(rating);
    }

    for (Comment comment : new HashSet<>(user.getComments())) {
      comment.getRecipe().getComments().remove(comment);
    }

    userRepository.delete(user);
  }

  @Override
  public List<User> findAll() {
    return userRepository.findAll();
  }

  @Override
  public void updateUserRole(Long userId, String role) {
    User user =
        userRepository
            .findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));

    if (role.equalsIgnoreCase("ADMIN")) {
      user.getRoles().add(role);
    } else if (role.equalsIgnoreCase("USER")) {
      user.getRoles().remove("ADMIN");
    }
    userRepository.save(user);
  }

  @Override
  public void updateUsername(String currentUsername, String username) {
    User user = userRepository.findByUsername(currentUsername);
    if (user == null) {
      throw new ResourceNotFoundException("User not found with username: " + currentUsername);
    }

    if (userRepository.findByUsername(username) != null) {
      throw new DataIntegrityViolationException("Username already taken: " + username);
    }

    user.setUsername(username);
    userRepository.save(user);
  }

  @Override
  public void updatePassword(String username, String currentPassword, String newPassword) {
    User user = userRepository.findByUsername(username);
    if (user == null) {
      throw new ResourceNotFoundException("User not found with username: " + username);
    }

    if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
      throw new IllegalArgumentException("Current password is incorrect");
    }

    user.setPassword(newPassword);
    userRepository.save(user);
  }
}
