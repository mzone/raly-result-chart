export default function PageBody({children=null, page_name=null}) {
    const className = "page-body " + (page_name ? 'page-body--' + page_name : '');
    return (
        <div className={className}>
            {children}
        </div>
    )
}
