import { SiteConfig } from "@/types/site"

const baseSiteConfig = {
  name: "GS - fullstack engineer",
  description: ["gymsummer website"],
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
