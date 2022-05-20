import type {ReactElement, ReactNode} from 'react'
import type {NextPage} from 'next'
import type {AppProps} from 'next/app'
import {RecoilRoot} from "recoil";
import LayoutDefault from "../layouts/LayoutDefault";
import '../../styles/_index.scss'

import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

const app = ({Component, pageProps}: AppPropsWithLayout) => {

    const getLayout = Component.getLayout ?? LayoutDefault;

    return (
        <RecoilRoot>
            {getLayout(<Component {...pageProps} />)}
        </RecoilRoot>
    )
};

export default app;
