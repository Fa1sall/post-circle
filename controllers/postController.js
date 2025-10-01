import { createPost, getAllPosts } from "../models/posts.js";
import { format } from "date-fns";

export const renderPosts = async (req, res) => {
  const posts = await getAllPosts();
  const postsWithFormattedDate = posts.map((post) => ({
    ...post,
    date: format(new Date(post.created_at), "MMM d yyyy, h:mm a"),
  }));
  console.log(postsWithFormattedDate);
  res.render("posts/postsPage", { posts: postsWithFormattedDate });
};

export const renderCreatePostPage = (req, res) => {
  res.render("posts/createPost");
};

export const handleCreatePost = async (req, res) => {
  const { title, body } = req.body;
  const user_id = req.user.id;
  await createPost(user_id, title, body);
  res.redirect("/posts");
};
