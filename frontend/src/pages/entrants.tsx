import PageHeader from "../parts/PageHeader";
import Link from "next/link";
import PageBody from "../parts/PageBody";
import EntrantList from "../parts/EntrantList";
import React, {useState, useEffect} from 'react'
import {useRecoilValue} from "recoil";
import Entrants from "../states/entrants";


const entrantsPage = () => {

    const entrants = useRecoilValue(Entrants);

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