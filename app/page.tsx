import { FooterSection } from "@/components/layout/sections/footer";
import { ProfileSection } from "@/components/layout/sections/profile";
import { BgMotionSection } from "@/components/layout/sections/bgmotion";
import { WorkCardSeciton } from "@/components/layout/sections/workcard";
import { SkillSection } from "@/components/layout/sections/skill";
import { ProjectSection } from "@/components/layout/sections/project";
import { EmptySection } from "@/components/layout/sections/empty";
import Script from "next/script";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  themeColor: siteConfig.themeColor,
  icons: siteConfig.icons,
  metadataBase: siteConfig.metadataBase,
  openGraph: {
    type: "website",
    url: "https://github.com/subinY/next-website",
    title: "GS - website",
    description: siteConfig.description[0],
    siteName: siteConfig.name,

    // images: [
    //   {
    //     url: "https://res.cloudinary.com/dbzv9xfjp/image/upload/v1723499276/og-images/shadcn-vue.jpg",
    //     width: 1200,
    //     height: 630,
    //     alt: "GS - website",
    //   },
    // ],
  },
};

export default async function Home() {
  return (
    <>
      {/* <Script src="https://files.cnblogs.com/files/mggahui/leader-line.min.js"></Script> */}
      {/* <Script src="https://unpkg.com/vconsole@latest/dist/vconsole.min.js"></Script> */}
      <BgMotionSection />
      <ProfileSection />
      <WorkCardSeciton />
      <SkillSection />
      <ProjectSection />
      <EmptySection />
      <FooterSection />
    </>
  );
}
