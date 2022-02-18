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
                    <Link href="/bump-chart/">
                        <a>
                            BUMP CHART
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/entrants">
                        <a>
                            ENTRANT
                        </a>
                    </Link>
                </li>
            </ul>
        </div>
    )
}
