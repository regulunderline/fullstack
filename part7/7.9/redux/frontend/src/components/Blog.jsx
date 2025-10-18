import { useSelector, useDispatch } from "react-redux";
import { likeBlog, commentBlog } from "../reducers/blogReducer";
import { useParams } from "react-router-dom";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

const Blog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const blog = useSelector(({ blogs }) => blogs.find((blog) => blog.id === id));

  const handleLike = () => {
    dispatch(likeBlog(blog));
  };

  const handleComment = (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    event.target.comment.value = "";
    dispatch(commentBlog({ id, comment }));
  };

  if (!blog) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <Typography variant="h2">
        {blog.title} {blog.author}
      </Typography>
      <Typography variant="body1">
        <a href={blog.url}>{blog.url}</a>
      </Typography>
      <Typography variant="body1">
        {blog.likes} likes
        <Button variant="outlined" onClick={handleLike}>
          like
        </Button>
      </Typography>
      <Typography variant="h3">comments</Typography>
      <form onSubmit={handleComment}>
        <TextField name="comment" />
        <Button variant="contained" type="submit">
          add comment
        </Button>
      </form>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          listStyleType: "disc",
        }}
      >
        {blog.comments.map((comment, index) => (
          <ListItem sx={{ display: "list-item" }} key={index}>
            <ListItemText primary={comment} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Blog;
