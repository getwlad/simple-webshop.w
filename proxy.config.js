const proxy = [
  {
    context: ["/imgur"],
    target: "https://api.imgur.com/3/image",
    secure: false,
    pathRewrite: { "^/api": "" },
  },
];
module.exports = proxy;
