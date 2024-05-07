const PostsRouter = require("./posts.router");
const SectionsRouter = require("./sections.router");
const UsersRouter = require("./users.router");
const StatisticsRouter = require("./statistics.router");

module.exports.useRouters = (app) => {
  app.use(PostsRouter); // app.use('/post',PostsRouter);
  app.use(SectionsRouter);
  app.use(UsersRouter);
  app.use(StatisticsRouter);
};
