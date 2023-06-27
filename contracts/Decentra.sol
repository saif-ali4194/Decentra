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
        address[] user_following;
        address[] user_followed;
    }

    
    struct Notification {
        uint256 id;
        string text;
        string image;
    }

     
    mapping (address => user) Users;
    address[] private userAddresses;
    mapping(address => Notification[]) public userNotifications;

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
    function follow(address userAddress) public {
        Users[msg.sender].user_following.push(userAddress);
        Users[msg.sender].following++;
        Users[userAddress].user_followed.push(msg.sender);
        Users[userAddress].followers++;
    }

    function unfollow(address userAddress) public {
        address[] storage following = Users[msg.sender].user_following;
        address[] storage followed = Users[userAddress].user_followed;
        for (uint256 i = 0; i < following.length; i++) {
            if (following[i] == userAddress) {
                if (i != following.length - 1) {
                    // Replace the element to be removed with the last element
                    following[i] = following[following.length - 1];
                }
                // Remove the last element
                following.pop();
                Users[msg.sender].following--;
                break; // Exit the loop once the user is found and removed
            }
        }

        for (uint256 i = 0; i < followed.length; i++) {
            if (followed[i] == msg.sender) {
                if (i != followed.length - 1) {
                    // Replace the element to be removed with the last element
                    followed[i] = followed[followed.length - 1];
                }
                // Remove the last element
                followed.pop();
                Users[userAddress].followers--;
                break; // Exit the loop once the follower is found and removed
            }
        }
    }

    // Function to add a new notification
    function addNotification(address _userAddress, string memory _text, string memory _image) public {
        Notification[] storage notifications = userNotifications[_userAddress];
        uint256 notificationId = notifications.length;
        Notification memory newNotification = Notification(notificationId, _text, _image);
        notifications.push(newNotification);
    }

    // Function to retrieve a user's notifications
    function getUserNotifications(address _userAddress) public view returns (Notification[] memory) {
        return userNotifications[_userAddress];
    }
}   