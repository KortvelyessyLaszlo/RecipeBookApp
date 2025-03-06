package net.recipe.app.controller;

import lombok.RequiredArgsConstructor;
import net.recipe.app.dto.UserDto;
import net.recipe.app.mapper.UserMapper;
import net.recipe.app.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

  private final UserService userService;

  private final UserMapper userMapper;

  @PostMapping
  public ResponseEntity<UserDto> save(@RequestBody UserDto userDto) {
    return ResponseEntity.ok(userMapper.userToDto(userService.save(userMapper.dtoToUser(userDto))));
  }

  @DeleteMapping("/{userId}")
  public ResponseEntity<Void> delete(@PathVariable Long userId) {
    userService.delete(userId);
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/{userId}")
  public ResponseEntity<UserDto> findById(@PathVariable Long userId) {
    return ResponseEntity.ok(userMapper.userToDto(userService.findById(userId)));
  }
}
