import React from 'react';
import {Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Landing from '../components/Landing';


import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';


const Profile = () => {

   
    const CreateEventClick = () => {
       
        console.log("Create button clicked");
        
    };

    //Logic to grab user and user events

    const {username: userParam} = useParams();

   
    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam },
      });

 
    const user = data?.me || data?.user || {};

    // navigate to personal profile page if username is yours
    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Navigate to="/me" />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (!user?.username) {
        return (
           <div>
            <Landing/>
           </div>
        );
    }


    //The moon is just like sun, it is big!
    // console.log(user.thoughts[0].thoughtText);

    



   
 


    
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
                            <input className="btn btn-primary w-50" type="button" value="Create Event" />
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

export default Profile;