export default function PageHeader({children}) {
    const clickFunc = () => {
        alert("click");
    }
    return (
        <div className="page-header">
            <div className="page-header__left">
                {children.left}
            </div>
            <div className="page-header__center">
                {children.center}
            </div>
            <div className="page-header__right">
                {children.right}
            </div>
        </div>
    )
}
