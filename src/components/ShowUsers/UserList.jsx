import React from "react";
import UserCard from "./UserCard";

function UserList({ users, onDelete }) {
    return (
        <div className="userList">
            {users.map((user) => (
                <UserCard key={user.id} user={user} onDelete={onDelete} />
            ))}
        </div>
    );
}

export default UserList;
