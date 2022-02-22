import PageHeader from "../parts/PageHeader";
import Link from "next/link";
import PageBody from "../parts/PageBody";
import EntrantList from "../parts/EntrantList";
import React, {useState, useEffect} from 'react'
import axios from "axios";


const entrantsPage = () => {

    const [entrants, setEntrants] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8888/api/entrants/?cname=rallyTango2021')
            .then(res => {
                setEntrants(res.data.entrants);
            })
    }, [])

    return (
        <>
            <PageHeader>
                {{
                    center: (
                        <>
                            <div>TOYOTA GAZOO Rally Challenge 2017 Rd7 takaoka</div>
                            <div>2017.08.29 - 08.30</div>
                        </>
                    )
                }}
            </PageHeader>

            <PageBody>
                <EntrantList items={entrants}/>
            </PageBody>
        </>
    )
};

export default entrantsPage;