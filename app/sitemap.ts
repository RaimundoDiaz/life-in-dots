import type { MetadataRoute } from "next";

const SITE_URL = "https://yourlifeindots.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "daily",
      priority: 1,
      alternates: {
        languages: {
          es: `${SITE_URL}/`,
          en: `${SITE_URL}/`,
          pt: `${SITE_URL}/`,
          fr: `${SITE_URL}/`,
          it: `${SITE_URL}/`,
          "x-default": `${SITE_URL}/`,
        },
      },
    },
  ];
}
