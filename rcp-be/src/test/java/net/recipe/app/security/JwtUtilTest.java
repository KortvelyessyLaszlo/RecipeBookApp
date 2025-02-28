package net.recipe.app.security;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class JwtUtilTest {

  @InjectMocks private JwtUtil jwtUtil;

  @BeforeEach
  public void setUp() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  public void testGenerateToken() {
    UserDetails userDetails =
        new User("testuser", "testpassword", List.of(new SimpleGrantedAuthority("ROLE_USER")));
    String token = jwtUtil.generateToken(userDetails);

    UserDetails parsedUserDetails = jwtUtil.parseToken(token);

    assertEquals(userDetails.getUsername(), parsedUserDetails.getUsername());
    assertEquals(userDetails.getAuthorities().size(), parsedUserDetails.getAuthorities().size());
  }
}
