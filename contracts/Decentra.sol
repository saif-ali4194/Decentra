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
        string age;
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
//     function getUsers(uint256 numberOfUsers) public view returns (user[] memory) {
//         if (numberOfUsers >= userAddresses.length) {
//             numberOfUsers = userAddresses.length;
//         }
//         user[] memory usersToRetrieve = new user[](numberOfUsers);
//         for (uint256 i = 0; i < numberOfUsers; i++) {
//             usersToRetrieve[i] = Users[userAddresses[i]];
//         }
//         return usersToRetrieve;
//    }
    function getRandomUsers() public view returns (user[] memory) {
    uint totalUsers = userAddresses.length;
    uint count = totalUsers > 5 ? 5 : totalUsers;

    address[] memory shuffledUserAddresses = new address[](totalUsers);
    for (uint i = 0; i < totalUsers; i++) {
        shuffledUserAddresses[i] = userAddresses[i];
    }

    // Shuffle the user addresses using Fisher-Yates algorithm
    for (uint i = totalUsers - 1; i > 0; i--) {
        uint j = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, i))) % (i + 1);
        (shuffledUserAddresses[i], shuffledUserAddresses[j]) = (shuffledUserAddresses[j], shuffledUserAddresses[i]);
    }

    user[] memory randomUsers = new user[](count);
    for (uint i = 0; i < count; i++) {
        address userAddress = shuffledUserAddresses[i];
        randomUsers[i] = Users[userAddress];
    }

    return randomUsers;
}



    function getUserAddresses() public view returns (address[] memory) {
        return userAddresses;
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
        Notification[] storage noti = userNotifications[_userAddress];
        uint256 notiId = noti.length;
        Notification memory newNoti = Notification(notiId, _text, _image);
        noti.push(newNoti);
    }

    // Function to retrieve a user's notifications
    function getUserNotifications(address _userAddress) public view returns (Notification[] memory) {
        return userNotifications[_userAddress];
    }
}   