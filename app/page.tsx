
import { FooterSection } from "@/components/layout/sections/footer";
import { ProfileSection } from "@/components/layout/sections/profile";
import { BgMotionSection } from "@/components/layout/sections/bgmotion";
import { WorkCardSeciton } from "@/components/layout/sections/workcard";
import { SkillSection } from "@/components/layout/sections/skill";
import { ProjectSection } from "@/components/layout/sections/project";
import { EmptySection } from "@/components/layout/sections/empty";
import { findRunData } from "@/server/controller/run";
import { findWorkData } from "@/server/controller/work";

export const metadata = {
  title: "GS - fullstack engineer",
  description: "gymsummer website",
  openGraph: {
    type: "website",
    url: "https://github.com/subinY/next-website",
    title: "GS - website",
    description: "Free Shadcn landing page for developers",
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

  const rData = await findRunData();
  const wData = await findWorkData();
  
  return (
    <>
      <BgMotionSection />
      <ProfileSection />
      <WorkCardSeciton rData={rData} wData={wData} />
      <SkillSection />
      <ProjectSection />
      <EmptySection />
      <FooterSection />
    </>
  );
}