package net.recipe.app.service;

import net.recipe.app.entity.User;

import java.util.List;

public interface UserService {
  void save(User user);

  void delete(Long userId);

  List<User> findAll();

  void updateUserRole(Long userId, String role);
}
