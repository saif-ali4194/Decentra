// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract Decentra {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    struct Profile {
        string name;
        string avatar;
        string banner;
        uint256 age;
        string gender;
        string status;
        string country;
        string city;
    }
    struct user {
        address userAddress;
        Profile profile;
        string occupation;
        string date_joined;
        uint256 followers;
        uint256 following;
        uint256[] user_following;
        uint256[] user_followed;
    }

    mapping (address => user) Users;
    address[] private userAddresses;

    // function addUser (
    //     Profile memory _profile,
    //     string memory _occupation,
    //     string memory _date_joined,
    //     uint256 _followers,
    //     uint256 _following,
    //     uint256[] memory _user_following,
    //     uint256[] memory _user_followed
    // ) public {
    //     user memory newUser = user(
    //     _profile,
    //     _occupation,
    //     _date_joined,
    //     _followers,
    //     _following,
    //     _user_following,
    //     _user_followed
    // );

    // Users[msg.sender] = newUser;
    // }

    // function updateUser (
    //     Profile memory _profile,
    //     string memory _occupation
    // ) public {
    //     user storage userData = Users[msg.sender];
    //     userData.profile = _profile;
    //     userData.occupation = _occupation;
    // }

    function createUser(user memory _user) public {
        Users[msg.sender] = _user;
        userAddresses.push(msg.sender);
    }

    function updateUser(user memory _user) public {
    Users[msg.sender] = _user;
    }

    function getUser(address userAddress) public view returns (user memory) {
        return Users[userAddress];
    }

    function getAllUsers() public view returns (user[] memory) {
        user[] memory allUsers = new user[](userAddresses.length);
        for (uint256 i = 0; i < userAddresses.length; i++) {
            allUsers[i] = Users[userAddresses[i]];
        }
        return allUsers;
    }

    // Follow Logic
    // function follow(address userAddress) public {
    //     Users[msg.sender].user_following.push(userAddress);
    //     Users[userAddress].user_followed.push(msg.sender);
    // }

    // function unfollow(address userAddress) public {
    //     address[] storage following = Users[msg.sender].user_following;
    //     address[] storage followed = Users[userAddress].user_followed;

    //     for (uint256 i = 0; i < following.length; i++) {
    //     if (following[i] == userAddress) {
    //             // Move the last element to the position of the element to be removed
    //             following[i] = following[following.length - 1];
    //             // Remove the last element
    //             following.pop();
    //             break; // Exit the loop once the user is found and removed
    //         }
    //     }
    //     for (uint256 i = 0; i < followed.length; i++) {
    //         if (followed[i] == msg.sender) {
    //             // Move the last element to the position of the element to be removed
    //             followed[i] = followed[followed.length - 1];
    //             // Remove the last element
    //             followed.pop();
    //             break; // Exit the loop once the follower is found and removed
    //         }
    //     }
    // }
}   