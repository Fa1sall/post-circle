import {
  createPost,
  getPosts,
  getTotalPosts,
  deletePost,
} from "../models/posts.js";
import { format } from "date-fns";

export const renderPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;
  const posts = await getPosts(limit, offset);
  const totalPosts = await getTotalPosts();
  const totalPages = Math.ceil(totalPosts / limit);

  const postsWithFormattedDate = posts.map((post) => ({
    ...post,
    username: req.isAuthenticated() ? post.username : "Anonymous",
    created_at: req.isAuthenticated()
      ? format(new Date(post.created_at), "MMM d yyyy, h:mm a")
      : "?????",
  }));
  const username = req.user?.username || "Anonymous";
  const isAdmin = req.user?.isadmin || false;
  //console.log(postsWithFormattedDate);
  res.render("posts/postsPage", {
    posts: postsWithFormattedDate,
    page,
    totalPages,
    username,
    isLoggedIn: req.isAuthenticated(),
    isAdmin,
  });
};

export const renderCreatePostPage = (req, res) => {
  res.render("posts/createPost", { isLoggedIn: req.isAuthenticated() });
};

export const handleCreatePost = async (req, res) => {
  const { title, body } = req.body;
  const user_id = req.user.id;
  await createPost(user_id, title, body);
  res.redirect("/posts");
};

export const handleDeletePost = async (req, res) => {
  const id = req.params.id;
  await deletePost(id);
  res.redirect("/posts");
};
