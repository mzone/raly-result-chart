import Link from 'next/link';
import {useRouter} from 'next/router';

export default function GlobalNavigation() {
    const router = useRouter();
    const path = router.pathname;
    const activeClassName = 'btn-global-navigation--active';

    const navClassNames = {
        'time' : 'btn-global-navigation ' + (["/", "/times/[id]"].includes(path) ? activeClassName : null),
        'bumpChart' : 'btn-global-navigation ' + (["/bump-chart"].includes(path) ? activeClassName : null),
        'entrants' : 'btn-global-navigation ' + (["/entrants"].includes(path) ? activeClassName : null),
    }

    return (
        <div className="global-navigation">
            <ul>
                <li>
                    <Link href="/">
                        <a className={navClassNames['time']} title="TIME">
                            <span>
                                <i className="btn-global-navigation__icon fas fa-stopwatch"/>
                                <span className="btn-global-navigation__label">TIME</span>
                            </span>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/bump-chart/">
                        <a className={navClassNames['bumpChart']} title="BUMP CHART">
                            <span>
                                <i className="btn-global-navigation__icon fas fa-chart-line"/>
                                <span className="btn-global-navigation__label">BUMP</span>
                            </span>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="/entrants/">
                        <a className={navClassNames['entrants']} title="ENTRANT">
                            <span>
                                <i className="btn-global-navigation__icon fas fa-user-group"/>
                                <span className="btn-global-navigation__label">ENTRANT</span>
                            </span>
                        </a>
                    </Link>
                </li>
            </ul>
        </div>
    )
}
