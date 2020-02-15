import React from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

class FriendsList extends React.Component {
    state = {
        friendsList: []
    };

    componentDidMount() {
        this.getFriendsList();
    }
     
    getFriendsList = () => {
        axiosWithAuth()
            .get('/friends')
            .then(res => {
                console.log(res);
                this.setState({
                    friendsList: res.data
                })
            })
            .catch(err => console.error(err));
    }
 
    render() {
        return (
            <div>
                {this.state.friendsList.map(friend => {
                  return <h1>{friend.id}</h1>
                })}
            </div>
        )
    }
}

export default FriendsList;