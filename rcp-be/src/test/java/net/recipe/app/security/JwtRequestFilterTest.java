package net.recipe.app.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.IOException;
import java.util.ArrayList;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

public class JwtRequestFilterTest {

  @Mock private JwtUtil jwtUtil;

  @InjectMocks private JwtRequestFilter jwtRequestFilter;

  private MockHttpServletRequest request;
  private MockHttpServletResponse response;
  private FilterChain filterChain;

  @BeforeEach
  public void setUp() {
    MockitoAnnotations.openMocks(this);
    request = new MockHttpServletRequest();
    response = new MockHttpServletResponse();
    filterChain = mock(FilterChain.class);
  }

  @Test
  public void testDoFilterInternal() throws IOException, ServletException {
    UserDetails userDetails = new User("testuser", "testpassword", new ArrayList<>());
    when(jwtUtil.parseToken(anyString())).thenReturn(userDetails);

    request.addHeader("Authorization", "Bearer testtoken");

    jwtRequestFilter.doFilterInternal(request, response, filterChain);

    verify(jwtUtil, times(1)).parseToken("testtoken");
    verify(filterChain, times(1)).doFilter(request, response);
  }
}
