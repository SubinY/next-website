
export type AuthorsConfig = {
    name: string;
    url: string;
  };
  export type ProductLink = {
    url: string;
    name: string;
  };
  export type SiteConfig = {
    name: string;
    description: string[];
    url: string;
    keywords: string[];
    authors: AuthorsConfig[];
    creator: string;
    links: {
      email?: string;
      twitter?: string;
      github?: string;
      buyMeCoffee?: string;
      juejin?: string;
      weChat?: string;
    };
    footerProduct: ProductLink[];
    metadataBase: URL;
    themeColor: string;
    icons: {
      icon: string;
      shortcut: string;
    };
  };
  