package net.recipe.app.controller;

import lombok.RequiredArgsConstructor;
import net.recipe.app.dto.UserDto;
import net.recipe.app.mapper.UserMapper;
import net.recipe.app.security.JwtUtil;

import net.recipe.app.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

  private final AuthenticationManager authenticationManager;

  private final JwtUtil jwtUtil;

  private final UserService userService;

  private final PasswordEncoder passwordEncoder;

  private final UserMapper userMapper;

  @PostMapping("/login")
  public String createAuthenticationToken(@RequestBody UserDto userDto) {
    Authentication authentication =
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(userDto.getUsername(), userDto.getPassword()));

    return jwtUtil.generateToken((UserDetails) authentication.getPrincipal());
  }

  @PostMapping("/register")
  public String registerUser(@RequestBody UserDto userDto) {
    userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));
    userDto.setRoles(Set.of("USER"));
    userService.save(userMapper.dtoToUser(userDto));

    return "User registered successfully";
  }

  @GetMapping("/check")
  public ResponseEntity<?> checkTokenValidity() {
    return ResponseEntity.ok().build();
  }

  @GetMapping("/checkAdminRole")
  public ResponseEntity<?> checkAdminRole() {
    return ResponseEntity.ok().build();
  }
}
