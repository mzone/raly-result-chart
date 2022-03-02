import Link from "next/link";

export default function BtnPageBack({href}) {
    return (
        <Link href={href}>
            <a className="btn-page-back">
                <i className="fas fa-arrow-left"/>
            </a>
        </Link>
    )
}
