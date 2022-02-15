import Link from 'next/link'

export default function GlobalNavigation() {
    return (
        <div className="global-navigation">
            <ul>
                <li>
                    <Link href="/">
                        <a>
                            TIME
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/">
                        <a>
                            BUMP CHART
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/">
                        <a>
                            ENTRANT
                        </a>
                    </Link>
                </li>
            </ul>
        </div>
    )
}
