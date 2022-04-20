import GlobalNavigation from "../parts/GlobalNavigation";

export default function LayoutDefault(page) {
    return (
        <div className="wrap responsive-content-wrap">
            <main>{page}</main>
            <GlobalNavigation/>
        </div>
    )
}
