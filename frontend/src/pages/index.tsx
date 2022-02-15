import PageHeader from "../parts/PageHeader";
import Link from 'next/link'
import PageBody from "../parts/PageBody";
import SSList from "../parts/SSList";

const ssListItems = [

    [
        {
            no: 1,
            name: 'IwatakiOkuyori1',
        },
        {
            no: 2,
            name: 'Taiko',
        },
        {
            no: 3,
            name: 'Okuyori',
        }
    ],
    [
        {
            no: 4,
            name: 'IwatakiOkuyori1',
        },
        {
            no: 5,
            name: 'Taiko',
        },
        {
            no: 6,
            name: 'Okuyori',
        }
    ]
];

const index = () => {
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
                <SSList items={ssListItems}/>
            </PageBody>
        </>
    )
};

export default index;