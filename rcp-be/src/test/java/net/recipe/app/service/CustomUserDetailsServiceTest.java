package net.recipe.app.service;

import net.recipe.app.entity.User;
import net.recipe.app.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

public class CustomUserDetailsServiceTest {

  @Mock private UserRepository userRepository;

  @InjectMocks private CustomUserDetailsService customUserDetailsService;

  @BeforeEach
  public void setUp() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  public void testLoadUserByUsername() {
    User user = new User();
    user.setUsername("testuser");
    user.setPassword("testpassword");
    user.setRoles(Set.of("USER"));
    when(userRepository.findByUsername(anyString())).thenReturn(user);

    customUserDetailsService.loadUserByUsername("testuser");

    // No exception means the test passed
  }

  @Test
  public void testLoadUserByUsernameNotFound() {
    when(userRepository.findByUsername(anyString())).thenReturn(null);

    assertThrows(
        UsernameNotFoundException.class,
        () -> customUserDetailsService.loadUserByUsername("testuser"));
  }
}
