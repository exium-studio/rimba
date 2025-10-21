import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";
import { APP } from "@/constants/_meta";
import { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Center } from "@chakra-ui/react";
import { PartnersLogo } from "@/components/widget/PartnersLogo";

const DefaultFallback = () => {
  return (
    <Center w={"100w"} minH={"100dvh"} color={"fg.subtle"}>
      <Center position={"relative"}>
        {/* <Img
          alt={`RIMBA letter art`}
          src={`${SVGS_PATH}/rimba_letter_art_color.svg`}
          width={40}
          height={40}
          objectFit="contain"
        /> */}
        <PartnersLogo />
      </Center>
    </Center>
  );
};

export const metadata: Metadata = {
  applicationName: APP.name,
  title: {
    default: APP.defaultTitle,
    template: APP.titleTemplate,
  },
  description: APP.description,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP.defaultTitle,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP.name,
    title: {
      default: APP.defaultTitle,
      template: APP.titleTemplate,
    },
    description: APP.description,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP.defaultTitle,
      template: APP.titleTemplate,
    },
    description: APP.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const ClientWrapper = dynamic(
  () => import("@/components/widget/ClientSideOnly"),
  {
    ssr: false,
    loading: () => <DefaultFallback />,
  }
);

interface Props {
  children: React.ReactNode;
}
export default function RootLayout(props: Props) {
  // Props
  const { children } = props;

  return (
    <html suppressHydrationWarning className={poppins.className}>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>

      <body>
        <Provider>
          <Toaster />
          <ClientWrapper>{children}</ClientWrapper>
        </Provider>
      </body>
    </html>
  );
}
