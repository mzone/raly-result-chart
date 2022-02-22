import PageHeader from "../parts/PageHeader";
import Link from 'next/link'
import PageBody from "../parts/PageBody";
import SSList from "../parts/SSList";
import {useEffect, useState} from "react";
import axios from "axios";

const index = () => {

    const [specialStages, setSpecialStages] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8888/api/specialStages/?cname=rallyTango2021')
            .then(res => {
                setSpecialStages(res.data);
            })
    }, [])

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
                <SSList items={specialStages}/>
            </PageBody>
        </>
    )
};

export default index;