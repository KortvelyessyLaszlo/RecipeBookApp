package net.recipe.app.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import net.recipe.app.service.CustomUserDetailsService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.context.SecurityContextHolder;

import java.io.IOException;
import java.util.ArrayList;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

public class JwtRequestFilterTest {

    @Mock
    private CustomUserDetailsService userDetailsService;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private JwtRequestFilter jwtRequestFilter;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testDoFilterInternal() throws ServletException, IOException {
        HttpServletRequest request = org.mockito.Mockito.mock(HttpServletRequest.class);
        HttpServletResponse response = org.mockito.Mockito.mock(HttpServletResponse.class);
        FilterChain chain = org.mockito.Mockito.mock(FilterChain.class);

        when(request.getHeader("Authorization")).thenReturn("Bearer testtoken");
        when(jwtUtil.extractUsername(anyString())).thenReturn("testuser");
        when(jwtUtil.validateToken(anyString(), anyString())).thenReturn(true);
        when(userDetailsService.loadUserByUsername(anyString())).thenReturn(new org.springframework.security.core.userdetails.User("testuser", "testpassword", new ArrayList<>()));

        jwtRequestFilter.doFilterInternal(request, response, chain);

        org.junit.jupiter.api.Assertions.assertNotNull(SecurityContextHolder.getContext().getAuthentication());
    }
}
