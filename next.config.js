/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    domains: ["res.cloudinary.com"], // Replace with your Cloudinary domain
    cloudinary: {
      cloudName: "dkmkutpxp", // Replace with your Cloudinary cloud name
    },
  },
  exportPathMap: async function () {
    return {
      "/": { page: "/" },
    };
  },
};

module.exports = nextConfig;
