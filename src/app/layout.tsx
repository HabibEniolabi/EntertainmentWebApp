// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import { ReactNode } from 'react';
// import { store } from "../";
import { Provider } from 'react-redux';

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
      <body>
        {/* <Provider store={store}> */}
          <MantineProvider>
            {children}
          </MantineProvider>
        {/* </Provider> */}
      </body>
    </html>
  );
}

export default RootLayout;