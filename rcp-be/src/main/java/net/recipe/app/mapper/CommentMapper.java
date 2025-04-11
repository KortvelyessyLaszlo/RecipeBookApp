package net.recipe.app.mapper;

import net.recipe.app.dto.CommentDto;
import net.recipe.app.entity.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CommentMapper {

  @Mapping(source = "user.username", target = "user")
  CommentDto commentToDto(Comment comment);

  @Mapping(target = "user", ignore = true)
  Comment dtoToComment(CommentDto commentDto);
}
