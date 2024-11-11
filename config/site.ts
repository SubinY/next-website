import { SiteConfig } from "@/types/env"

const baseSiteConfig = {
  name: "gymsummer.com",
  description: ["The weak love records"],
  url: "https://www.gymsummer.com",
  metadataBase: new URL("https://www.gymsummer.com"),
  keywords: [
    "Full Stack Developer",
    "Front End Developer",
    "Web",
    "gym",
    "Jazz Drum",
  ],
  authors: [
    {
      name: "gymsummer",
      url: "https://www.gymsummer.com",
    }
  ],
  creator: 'gymsummer',
  themeColor: '#fff',
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
  },
  links: {
    github: "https://github.com/SubinY/next-website",
  },
  footerProduct: [
    { url: 'https://www.gymsummer.com', name: 'gymsummer' },
  ]
}

export const siteConfig: SiteConfig = {
  ...baseSiteConfig,
}
