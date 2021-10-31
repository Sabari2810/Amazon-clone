module.exports = {
  images: {
    domains: [
      "links.papareact.com",
      "fakestoreapi.com",
      "cdn.worldvectorlogo.com",
    ],
  },
  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },
  env: {
    stripe_key: process.env.STRIPE_KEY,
  },
};
