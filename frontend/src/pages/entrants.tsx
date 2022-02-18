import PageHeader from "../parts/PageHeader";
import Link from "next/link";
import PageBody from "../parts/PageBody";
import EntrantList from "../parts/EntrantList";

const entrants = () => {
    return (
        <>
            <PageHeader>
                {{
                    left: (
                        <Link href="/">
                            <a>
                                <i className="fa-solid fa-arrow-left"/> aa
                            </a>
                        </Link>
                    ),
                    center: (
                        <>
                            <div>TOYOTA GAZOO Rally Challenge 2017 Rd7 takaoka</div>
                            <div>2017.08.29 - 08.30</div>
                        </>
                    )
                }}
            </PageHeader>

            <PageBody>
                <EntrantList items={[1,2,3]}/>
            </PageBody>
        </>
    )
};

export default entrants;