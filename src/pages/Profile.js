import React, { useState } from 'react';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_PAST_EVENTS } from '../utils/queries';


export default function Profile() {

    const CreateEventClick = () => {
       
        console.log("Create button clicked");
        
    };

    const userID = "FakeUserID";
    const olderThanDate = "2023-08-01"

    const {loading, data} = useQuery(QUERY_PAST_EVENTS, {
        variables:{userID, olderThan: olderThanDate}
    });

    if (loading){
        return <div>Loading...</div>
    }
    

    
    return(
        <div className='profileBody container p-3'>


            <div className="container">
                <div className="row">

                    <div className="col-sm-4">
                        <h4>Profile Intro</h4>
                        
                        <div className='profileInfo pt-2'>
                            <p>Name: NamePlace Holder</p>
                            <p>Email:  Email Placeholder</p>
                        </div>

                        <div>
                            <input className="btn btn-primary w-50" type="button" value="Create Event"  onClick={CreateEventClick}/>
                        </div>
                        
                    </div>


                    <div className="col-sm-8">
                        <div className= 'currentEventSection '>
                            <h4>Current Events</h4>
                            <div className="list-group">
                                <button type="button" className="list-group-item list-group-item-action "> Event #1</button>
                                <button type="button" className="list-group-item list-group-item-action "> Event #2</button>
                                <button type="button" className="list-group-item list-group-item-action "> Event #3</button>
                                <button type="button" className="list-group-item list-group-item-action "> Event #4</button>
                                <button type="button" className="list-group-item list-group-item-action "> Event #5</button>
                            </div>
                        </div>
                       
                        <div className= 'pastEventSection pt-3'>
                            <h4>Past Events</h4>
                            <div className="list-group">
                                <button type="button" className="list-group-item list-group-item-action "> Event #1</button>
                                <button type="button" className="list-group-item list-group-item-action "> Event #2</button>
                                <button type="button" className="list-group-item list-group-item-action "> Event #3</button>
                                <button type="button" className="list-group-item list-group-item-action "> Event #4</button>
                                <button type="button" className="list-group-item list-group-item-action "> Event #5</button>
                            </div>
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
    );
}