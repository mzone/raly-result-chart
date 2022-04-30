export default function PageBody({children = null, page_name = null, max_width = null}) {

    const isTwoColumns = children.hasOwnProperty('side');

    //クラス名設定
    let classNameList = ["page-body"];
    if (page_name) classNameList.push(`page-body--${page_name}`);
    if (isTwoColumns) classNameList.push(`page-body--two-columns`);
    const className = classNameList.join(" ");

    //スタイル設定
    const style = {};
    if (max_width) style['max-width'] = `${max_width}`;

    //カラムコンテンツ設定
    const bodyContent = isTwoColumns ?
        (
            <>
            <div className="page-body__inner__side">{children.side}</div>
            <div className="page-body__inner__main">{children.main}</div>
            </>
        ) :
        children;

    return (
        <div className={className}>
            <div className="page-body__inner" style={style}>
                {bodyContent}
            </div>
        </div>
    )
}
