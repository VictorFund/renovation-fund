import { Inter, Noto_Sans, Montserrat } from "next/font/google";
import localFont from "next/font/local";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
  variable: "--inter",
});

const notoSans = Noto_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
  variable: "--notoSans",
});
const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600"],
  variable: "--montserrat",
});

const kyivTypeLight = localFont({
  src: "./KyivTypeSerif-Light.woff2",
  weight: "300",
  variable: "--lightSerif",
});

const kyivTypeRegular = localFont({
  src: "./KyivTypeSerif-Regular.woff2",
  weight: "400",
  variable: "--regularSerif",
});

const kyivTypeMedium = localFont({
  src: "./KyivTypeSerif-Medium.woff2",
  weight: "500",
  variable: "--mediumSerif",
});

const kyivTypeBold = localFont({
  src: "./KyivTypeSerif-Bold.woff2",
  weight: "700",
  variable: "--boldSerif",
});

export const fonts = `${kyivTypeLight.variable} ${kyivTypeRegular.variable} ${kyivTypeMedium.variable} ${kyivTypeBold.variable} ${inter.variable} ${notoSans.variable} ${montserrat.variable}`;
