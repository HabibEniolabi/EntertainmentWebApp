import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import StoreProvider from './providers';
import { Outfit } from "next/font/google";
import { Notifications } from '@mantine/notifications';

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-outfit",
});

export const metadata = {
  title: 'My Entertainment app',
  description: 'A simple entertainment app built with Next.js and Mantine',
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={outfit.variable}>
        <StoreProvider>
          <MantineProvider>
            <Notifications />
            {children}
          </MantineProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

export default RootLayout;