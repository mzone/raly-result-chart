import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import LayoutDefault from "../layouts/LayoutDefault";
import '../../styles/_index.scss'

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export default ({ Component, pageProps }: AppPropsWithLayout) => {
    // Use the layout defined at the page level, if available
    //const getLayout = Component.getLayout ?? ((page) => page)
    const getLayout = Component.getLayout ?? LayoutDefault

    return getLayout(<Component {...pageProps} />)
}
