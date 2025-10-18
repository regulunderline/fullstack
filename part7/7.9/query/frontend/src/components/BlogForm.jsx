import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";
import { useNotificationDispatch } from "../NotificationContext";
import { TextField, Button, Typography } from "@mui/material";

const BlogForm = ({ user }) => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (response) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(
        ["blogs"],
        blogs.concat({
          ...response,
          user: { name: user.name, username: user.username },
        }),
      );
      dispatch({
        notification: {
          message: `a new blog ${response.title} by ${response.author}`,
          type: "success",
        },
      });
      setTimeout(() => {
        dispatch({ notification: null });
      }, 5000);
    },
    onError: (error) => {
      console.log(error);
      dispatch({
        notification: { message: `could not create a blog`, type: "error" },
      });
      setTimeout(() => {
        dispatch({ notification: null });
      }, 5000);
    },
  });

  const addBlog = async (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const author = event.target.author.value;
    const url = event.target.url.value;
    event.target.title.value = "";
    event.target.author.value = "";
    event.target.url.value = "";

    newBlogMutation.mutate({ title, author, url });
  };

  return (
    <div>
      <Typography variant="h3">create new</Typography>
      <form onSubmit={addBlog}>
        <div>
          <TextField name="title" label="title" />
        </div>
        <div>
          <TextField name="author" label="author" />
        </div>
        <div>
          <TextField name="url" label="url" />
        </div>
        <Button variant="contained" color="primary" type="submit">
          create
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
