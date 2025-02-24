package net.recipe.app.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class JwtUtilTest {

  @InjectMocks private JwtUtil jwtUtil;

  @BeforeEach
  public void setUp() {
    MockitoAnnotations.openMocks(this);
    ReflectionTestUtils.setField(jwtUtil, "secret", "secret"); // Set the secret key
  }

  @Test
  public void testExtractUsername() {
    String secret = "secret";
    String token =
        Jwts.builder()
            .setSubject("testuser")
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
            .signWith(SignatureAlgorithm.HS256, secret)
            .compact();
    String username = jwtUtil.extractUsername(token);
    assertEquals("testuser", username);
  }

  @Test
  public void testGenerateToken() {
    String token = jwtUtil.generateToken("testuser");
    assertTrue(token != null && !token.isEmpty());
  }

  @Test
  public void testValidateToken() {
    String token = jwtUtil.generateToken("testuser");
    assertTrue(jwtUtil.validateToken(token, "testuser"));
  }
}
