import React, { useState } from 'react';
import CustomNavbar from './navbar.js'
import QuestionsTable from './questionTable.js'
import { useQuery } from '@apollo/react-hooks';
import AllQuestions from '../queries/questions.js'
import Spinner from 'react-bootstrap/Spinner'


function TopLevelQuery () {

    const {loading, error, data: Querydata, refetch, updateQuery} = useQuery(AllQuestions, {onCompleted: () => {console.log(Querydata.consumer_questioninfo)}});

    
    if (loading) return (

        <div>
            <header>

            <CustomNavbar refetch={null}/>

            </header>

            <p>Loading...</p>
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>

        </div>
    ); else if (error) return (
            <div>

                <header>

                <CustomNavbar refetch={null}/>

                </header>

                <p>Error: {error.message}</p>

            </div>

    );
    
    else if (Querydata) return (
        <div>
            <header>

            <CustomNavbar refetch={refetch} />

            </header>
        
        
            <QuestionsTable Querydata={Querydata} refetch={refetch} updateQuery={updateQuery}/>
        
        
        </div>

    )
}


export default TopLevelQuery;