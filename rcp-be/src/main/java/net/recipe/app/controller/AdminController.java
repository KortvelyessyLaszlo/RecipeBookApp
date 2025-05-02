package net.recipe.app.controller;

import lombok.RequiredArgsConstructor;
import net.recipe.app.dto.RecipeInfoLineDto;
import net.recipe.app.dto.UserDto;
import net.recipe.app.mapper.RecipeInfoLineMapper;
import net.recipe.app.mapper.UserMapper;
import net.recipe.app.service.RecipeService;
import net.recipe.app.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
  private final UserService userService;
  private final UserMapper userMapper;
  private final RecipeService recipeService;
  private final RecipeInfoLineMapper recipeInfoLineMapper;

  @GetMapping("/users")
  public ResponseEntity<List<UserDto>> getAllUsers() {
    return ResponseEntity.ok(userService.findAll().stream().map(userMapper::userToDto).toList());
  }

  @DeleteMapping("/users/{userId}")
  public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
    userService.delete(userId);
    return ResponseEntity.noContent().build();
  }

  @PutMapping("/users/{userId}/role")
  public ResponseEntity<Void> updateUserRole(@PathVariable Long userId, @RequestBody String role) {
    userService.updateUserRole(userId, role);
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/recipes")
  public ResponseEntity<List<RecipeInfoLineDto>> getAllRecipes() {
    return ResponseEntity.ok(
        recipeService.findAll().stream().map(recipeInfoLineMapper::recipeToDto).toList());
  }

  @DeleteMapping("/recipes/{recipeId}")
  public ResponseEntity<Void> deleteRecipe(@PathVariable Long recipeId) {
    recipeService.deleteByAdmin(recipeId);
    return ResponseEntity.noContent().build();
  }
}
