import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import blogService from "../services/blogs";
import { useNotificationDispatch } from "../NotificationContext";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";

const Blog = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const likeMutation = useMutation({
    mutationFn: blogService.like,
    onSuccess: (response) => {
      queryClient.setQueryData(["blog"], { ...response, user: blog.user });
      dispatch({
        notification: {
          message: `you liked a blog ${response.title} by ${response.author}`,
          type: "success",
        },
      });
      setTimeout(() => {
        dispatch({ notification: null });
      }, 5000);
    },
    onError: (error) => {
      console.log(error);
      dispatch({ notification: { message: `could not like`, type: "error" } });
      setTimeout(() => {
        dispatch({ notification: null });
      }, 5000);
    },
  });

  const commentMutation = useMutation({
    mutationFn: blogService.comment,
    onSuccess: (response) => {
      if (response.status === 401) {
        dispatch({
          notification: { message: `log in to comment`, type: "error" },
        });
        setTimeout(() => {
          dispatch({ notification: null });
        }, 5000);
      } else {
        queryClient.setQueryData(["blog"], { ...response, user: blog.user });
        dispatch({
          notification: {
            message: `you commented a blog ${response.title} by ${response.author}`,
            type: "success",
          },
        });
        setTimeout(() => {
          dispatch({ notification: null });
        }, 5000);
      }
    },
    onError: (error) => {
      console.log(error);
      dispatch({
        notification: { message: `could not comment`, type: "error" },
      });
      setTimeout(() => {
        dispatch({ notification: null });
      }, 5000);
    },
  });

  const result = useQuery({
    queryKey: ["blog"],
    queryFn: () => blogService.getOne(id),
    refetchOnWindowFocus: false,
    retry: false,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError && result.error.message === "Network Error") {
    return <div>blog service not available due to problems in server</div>;
  }

  const blog = result.data;

  if (!blog) {
    return <h2>unknown blog</h2>;
  }

  const handleLike = async (likedBlog) => {
    likeMutation.mutate(likedBlog);
  };

  const handleComment = async (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;
    event.target.comment.value = "";

    commentMutation.mutate({ id, comment });
  };

  return (
    <Box>
      <Typography variant="h2">
        {blog.title} {blog.author}
      </Typography>
      <Typography variant="body1">
        <a href={blog.url}>{blog.url}</a>
      </Typography>
      <Typography variant="body1">
        {blog.likes} likes
        <Button variant="outlined" onClick={() => handleLike(blog)}>
          like
        </Button>
      </Typography>
      <Typography variant="body1">added by {blog.user.name}</Typography>
      <Typography variant="h3">comments</Typography>
      <form onSubmit={handleComment}>
        <TextField name="comment" />
        <Button variant="outlined" type="submit">
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
    </Box>
  );
};

export default Blog;
