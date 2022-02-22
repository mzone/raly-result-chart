import GlobalNavigation from "../parts/GlobalNavigation";

export default function LayoutDefault(page) {
    return (
        <div className="wrap">
            <main>{page}</main>
            <GlobalNavigation/>
        </div>
    )
}
