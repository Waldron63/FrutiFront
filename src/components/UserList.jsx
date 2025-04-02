import React from 'react';
import UserCard from './UserCard';

function UserList({ users }) {
    return (
        <div className="user-list">
            {users.map(user => (
                <UserCard key={user.id} user={user} />
            ))}
        </div>
    );
}

export default UserList;