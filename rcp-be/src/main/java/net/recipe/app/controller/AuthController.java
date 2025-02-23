package net.recipe.app.controller;

import net.recipe.app.dto.UserDto;
import net.recipe.app.security.JwtUtil;
import net.recipe.app.service.CustomUserDetailsService;
import net.recipe.app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

  private final AuthenticationManager authenticationManager;

  private final CustomUserDetailsService userDetailsService;

  private final JwtUtil jwtUtil;

  private final UserService userService;

  private final PasswordEncoder passwordEncoder;

  @Autowired
  public AuthController(
      AuthenticationManager authenticationManager,
      CustomUserDetailsService userDetailsService,
      JwtUtil jwtUtil,
      UserService userService,
      PasswordEncoder passwordEncoder) {
    this.authenticationManager = authenticationManager;
    this.userDetailsService = userDetailsService;
    this.jwtUtil = jwtUtil;
    this.userService = userService;
    this.passwordEncoder = passwordEncoder;
  }

  @PostMapping("/login")
  public String createAuthenticationToken(@RequestBody UserDto userDto) {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(userDto.getUserName(), userDto.getPassword()));

    final UserDetails userDetails = userDetailsService.loadUserByUsername(userDto.getUserName());

    return jwtUtil.generateToken(userDetails.getUsername());
  }

  @PostMapping("/register")
  public String registerUser(@RequestBody UserDto userDto) {
    userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));
    userService.save(userDto);
    return "User registered successfully";
  }
}
