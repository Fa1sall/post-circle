export const isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    res.render("auth/unauthorized");
  }
};
