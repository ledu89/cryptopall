// (module.exports = [
//   "strapi::logger",
//   "strapi::errors",
//   "strapi::security",
//   "strapi::cors",
//   "strapi::poweredBy",
//   "strapi::query",
//   "strapi::body",
//   "strapi::session",
//   "strapi::favicon",
//   "strapi::public",
// ]),
//   {
//     name: "strapi::security",
//     config: {
//       cors: {
//         origin: ["https://strapi-cryptopall.onrender.com"],
//       },
//     },
//   };
module.exports = [
  "strapi::logger",
  "strapi::errors",
  {
    name: "strapi::cors",
    config: {
      origin: [
        "https://strapi-cryptopall.onrender.com", // Backend URL
        "https://cryptopall.vercel.app", // Frontend URL
      ],
      methods: ["GET", "POST", "PUT", "DELETE"],
      headers: ["Content-Type", "Authorization"],
      keepHeadersOnError: true,
    },
  },
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        directives: {
          "script-src": ["'self'", "https:"],
          "img-src": ["'self'", "data:", "blob:"],
        },
      },
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
