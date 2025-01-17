/* eslint-disable react/jsx-props-no-spreading */
import { ChakraProvider } from "@chakra-ui/react";
import { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { DAppProvider } from "@usedapp/core";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import Head from "next/head";
import "@fontsource/inter";

import defaultSEOConfig from "../../next-seo.config";
import { CollateralProvider } from "../contexts/CollateralContext";
import { GlobalLendingInfoProvider } from "../contexts/GlobalLendingInfo";
import { UserLendingInfoProvider } from "../contexts/UserLendingInfo";
import { Layout } from "components/layout";
import { ModalProvider } from "contexts/Modal";
import { NotificationProvider } from "contexts/Notifications";
import { createEmotionCache } from "styles/createEmotionCache";
import { customTheme } from "styles/customTheme";
import "styles/globals.css";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) => {
  return (
    <CacheProvider value={emotionCache}>
      <ChakraProvider theme={customTheme}>
        <DAppProvider config={{}}>
          <CollateralProvider>
            <GlobalLendingInfoProvider>
              <UserLendingInfoProvider>
                <NotificationProvider>
                  <ModalProvider>
                    <Head>
                      <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
                      />
                    </Head>
                    <DefaultSeo {...defaultSEOConfig} />
                    <Layout>
                      <Component {...pageProps} />
                    </Layout>
                  </ModalProvider>
                </NotificationProvider>
              </UserLendingInfoProvider>
            </GlobalLendingInfoProvider>
          </CollateralProvider>
        </DAppProvider>
      </ChakraProvider>
    </CacheProvider>
  );
};

MyApp.defaultProps = {
  emotionCache: clientSideEmotionCache,
};

export default MyApp;
