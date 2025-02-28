package net.recipe.app.controller;

import lombok.RequiredArgsConstructor;
import net.recipe.app.dto.UserDto;
import net.recipe.app.mapper.GlobalMapper;
import net.recipe.app.security.JwtUtil;
import net.recipe.app.service.UserService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

  private final AuthenticationManager authenticationManager;

  private final JwtUtil jwtUtil;

  private final UserService userService;

  private final PasswordEncoder passwordEncoder;

  private final GlobalMapper globalMapper;

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
    userService.save(globalMapper.dtoToUser(userDto));

    return "User registered successfully";
  }
}
