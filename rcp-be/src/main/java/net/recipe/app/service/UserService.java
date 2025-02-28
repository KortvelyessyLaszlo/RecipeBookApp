package net.recipe.app.service;

import net.recipe.app.entity.User;

public interface UserService {
  User save(User user);

  void delete(Long userId);

  User findById(Long userId);
}
