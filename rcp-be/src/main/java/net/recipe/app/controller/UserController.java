package net.recipe.app.controller;

import lombok.RequiredArgsConstructor;
import net.recipe.app.dto.PasswordUpdateDTO;
import net.recipe.app.dto.UsernameUpdateDTO;
import net.recipe.app.security.JwtUtil;
import net.recipe.app.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
  private final UserService userService;
  private final JwtUtil jwtUtil;
  private final UserDetailsService userDetailsService;
  private final PasswordEncoder passwordEncoder;

  @GetMapping("/profile")
  public ResponseEntity<String> getUserProfile() {
    return ResponseEntity.ok(getCurrentUsername());
  }

  @PutMapping("/update/username")
  public ResponseEntity<String> updateUsername(@RequestBody UsernameUpdateDTO request) {
    String currentUsername = getCurrentUsername();
    userService.updateUsername(currentUsername, request.getUsername());

    return ResponseEntity.ok(
        jwtUtil.generateToken(userDetailsService.loadUserByUsername(request.getUsername())));
  }

  @PutMapping("/update/password")
  public ResponseEntity<String> updatePassword(@RequestBody PasswordUpdateDTO request) {
    String username = getCurrentUsername();
    userService.updatePassword(
        username, request.getCurrentPassword(), passwordEncoder.encode(request.getNewPassword()));

    return ResponseEntity.ok(
        jwtUtil.generateToken(userDetailsService.loadUserByUsername(username)));
  }

  private String getCurrentUsername() {
    return ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal())
        .getUsername();
  }
}
