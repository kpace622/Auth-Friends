import React from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

class FriendsList extends React.Component {
    state = {
        friendsList: [],
        newFriend: {
            id: new Date(),
            name: '',
            age: '',
            email: ''
        }
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

    handleChange = e => {
        this.setState({
            newFriend: {
                ...this.state.newFriend,
                [e.target.name]: e.target.value
            }
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        axiosWithAuth()
        .post('/friends', this.state.newFriend)
        .then(res => {
            console.log(res);
        })
        .catch(err => console.log(err))
    }
 
    render() {
        return (
            <div>
                <div>
                    {this.state.friendsList.map(friend => (
                        <div key={friend.id}>
                            <h2>{friend.name}</h2>
                            <h3>{friend.age}</h3>
                            <h3>{friend.email}</h3>
                        </div>
                            ))}
                </div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input 
                            type='text'
                            value={this.state.newFriend.name}
                            onChange={this.handleChange}
                            name='name'
                        />
                         <input 
                            type='text'
                            value={this.state.newFriend.age}
                            onChange={this.handleChange}
                            name='age'
                        />
                         <input 
                            type='email'
                            value={this.state.newFriend.email}
                            onChange={this.handleChange}
                            name='email'
                        />
                    <button>Add friend</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default FriendsList;