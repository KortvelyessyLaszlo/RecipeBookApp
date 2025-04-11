package net.recipe.app.controller;

import lombok.RequiredArgsConstructor;
import net.recipe.app.dto.CommentDto;
import net.recipe.app.mapper.CommentMapper;
import net.recipe.app.service.CommentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/comment")
@RequiredArgsConstructor
public class CommentController {
  private final CommentService service;

  private final CommentMapper commentMapper;

  @GetMapping("/{recipeId}")
  public List<CommentDto> findByRecipeId(@PathVariable Long recipeId) {
    return service.findByRecipeId(recipeId).stream()
        .map(commentMapper::commentToDto)
        .collect(Collectors.toList());
  }

  @PostMapping("/{recipeId}")
  public CommentDto add(@RequestBody CommentDto commentDto, @PathVariable Long recipeId) {
    return commentMapper.commentToDto(
        service.add(commentMapper.dtoToComment(commentDto), recipeId));
  }
}
