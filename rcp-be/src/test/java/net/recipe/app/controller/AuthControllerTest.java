package net.recipe.app.controller;

import net.recipe.app.dto.UserDto;
import net.recipe.app.security.JwtUtil;
import net.recipe.app.service.CustomUserDetailsService;
import net.recipe.app.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;

public class AuthControllerTest {

  @Mock private AuthenticationManager authenticationManager;

  @Mock private CustomUserDetailsService userDetailsService;

  @Mock private JwtUtil jwtUtil;

  @Mock private UserService userService;

  @Mock private PasswordEncoder passwordEncoder;

  @InjectMocks private AuthController authController;

  private MockMvc mockMvc;

  @BeforeEach
  public void setUp() {
    MockitoAnnotations.openMocks(this);
    mockMvc = MockMvcBuilders.standaloneSetup(authController).build();
  }

  @Test
  public void testCreateAuthenticationToken() throws Exception {
    UserDto userDto = new UserDto();
    userDto.setUserName("testuser");
    userDto.setPassword("testpassword");

    when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
        .thenReturn(null);
    when(userDetailsService.loadUserByUsername(anyString()))
        .thenReturn(
            new org.springframework.security.core.userdetails.User(
                "testuser", "testpassword", new ArrayList<>()));
    when(jwtUtil.generateToken(anyString())).thenReturn("testtoken");

    mockMvc
        .perform(
            post("/api/auth/login")
                .contentType("application/json")
                .content("{\"userName\":\"testuser\",\"password\":\"testpassword\"}"))
        .andExpect(status().isOk());
  }

  @Test
  public void testRegisterUser() throws Exception {
    UserDto user = new UserDto();
    user.setUserName("testuser");
    user.setPassword("testpassword");

    when(passwordEncoder.encode(anyString())).thenReturn("encodedpassword");
    when(userService.save(any(UserDto.class))).thenReturn(user);

    mockMvc
        .perform(
            post("/api/auth/register")
                .contentType("application/json")
                .content("{\"username\":\"testuser\",\"password\":\"testpassword\"}"))
        .andExpect(status().isOk());
  }
}
