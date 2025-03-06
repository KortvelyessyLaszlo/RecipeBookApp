package net.recipe.app.controller;

import net.recipe.app.dto.UserDto;
import net.recipe.app.entity.User;
import net.recipe.app.mapper.UserMapper;
import net.recipe.app.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class UserControllerTest {

  @Mock private UserService userService;

  @Mock private UserMapper userMapper;

  @InjectMocks private UserController userController;

  private MockMvc mockMvc;

  @BeforeEach
  public void setUp() {
    MockitoAnnotations.openMocks(this);
    mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
  }

  @Test
  public void testSaveUser() throws Exception {
    UserDto userDto = new UserDto();
    User user = new User();
    when(userMapper.dtoToUser(any(UserDto.class))).thenReturn(user);
    when(userService.save(any(User.class))).thenReturn(user);
    when(userMapper.userToDto(any(User.class))).thenReturn(userDto);

    mockMvc
        .perform(
            post("/api/user")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"username\":\"testuser\",\"password\":\"testpassword\"}"))
        .andExpect(status().isOk());
  }

  @Test
  public void testDeleteUser() throws Exception {
    mockMvc.perform(delete("/api/user/1")).andExpect(status().isNoContent());
  }

  @Test
  public void testFindUserById() throws Exception {
    UserDto userDto = new UserDto();
    when(userService.findById(anyLong())).thenReturn(new User());
    when(userMapper.userToDto(any(User.class))).thenReturn(userDto);

    mockMvc.perform(get("/api/user/1")).andExpect(status().isOk());
  }
}
