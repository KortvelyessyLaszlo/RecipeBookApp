package net.recipe.app.service;

import net.recipe.app.common.exception.ResourceNotFoundException;
import net.recipe.app.entity.User;
import net.recipe.app.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

public class UserServiceImplTest {

  @Mock private UserRepository userRepository;

  @InjectMocks private UserServiceImpl userService;

  @BeforeEach
  public void setUp() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  public void testSaveUser() {
    User user = new User();
    when(userRepository.save(any(User.class))).thenReturn(user);

    userService.save(user);

    verify(userRepository, times(1)).save(user);
  }

  @Test
  public void testSaveUserAlreadyExists() {
    User user = new User();
    user.setUsername("username");
    user.setPassword("password");
    when(userRepository.findByUsername(anyString())).thenReturn(user);

    assertThrows(DataIntegrityViolationException.class, () -> userService.save(user));
  }

  @Test
  public void testDeleteUserNotFound() {
    when(userRepository.findById(anyLong())).thenReturn(Optional.empty());

    assertThrows(ResourceNotFoundException.class, () -> userService.delete(1L));
  }
}
