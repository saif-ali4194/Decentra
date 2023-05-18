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
        Profile profile;
        string occupation;
        string date_joined;
        uint256 followers;
        uint256 following;
        uint256[] user_following;
        uint256[] user_followed;
    }

    mapping (address => user) Users;

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

    function updateUser (
        Profile memory _profile,
        string memory _occupation,
        string memory _date_joined,
        uint256 _followers,
        uint256 _following,
        uint256[] memory _user_following,
        uint256[] memory _user_followed
    ) public {
        user storage userData = Users[msg.sender];
        userData.profile = _profile;
        userData.occupation = _occupation;
        userData.date_joined = _date_joined;
        userData.followers = _followers;
        userData.following = _following;
        userData.user_following = _user_following;
        userData.user_followed = _user_followed;
    }

    function getUser(address userAddress) public view returns (user memory) {
        return Users[userAddress];
    }
}