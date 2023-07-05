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

    struct Tweet{
        address tweetOwner;
        uint256 t_id;     
        string username;
        string userAt;
        string date;
        string text;
        string cId;
        

    }

    struct Comment{
        address commentOwner;
        uint256 c_id;
        uint256 p_id;
        string username;
        string userAt;
        string date;
        string text;
        string cId;
        
        
    }

    struct Trend{
        uint256 t_id;
        string t_name;
        string t_location;
        uint t_mentions;
    }
    
    struct Notification {
        uint256 id;
        string text;
        string image;
    }

    uint256 tweetId=1000;
    Tweet[] public tweets;
    Trend[] public trends;
    mapping (address => Tweet[]) public userTweets;
    mapping (uint => Comment[]) public comments; 
    mapping (uint => address[]) public liked;
    

    mapping (address => user) Users;
    address[] private userAddresses;
    mapping(address => Notification[]) public userNotifications;

     uint256 tweetId=1000;
    Tweet[] public tweets;
    mapping (address => Tweet[]) public userTweets;

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

    function stringsEquals(string memory s1, string memory s2) private pure returns (bool) {
        bytes memory b1 = bytes(s1);
        bytes memory b2 = bytes(s2);
        uint256 l1 = b1.length;
        if (l1 != b2.length) return false;
        for (uint256 i=0; i<l1; i++) {
            if (b1[i] != b2[i]) return false;
        }
        return true;
}

    function addLike(uint _id) public {
        address[] storage temp = liked[_id];
        temp.push(msg.sender);
        liked[_id]=temp;
    }
    function removeLike(uint _id) public{
        address[] storage temp =liked[_id];
            for(uint i=0; i<temp.length; i++)
            {
                if(temp[i] == msg.sender){
                    
                    if(temp.length==1){
                        temp.pop();
                    }
                    else{
                        for(uint j=i; j<temp.length-1;j++){
                            temp[j]=temp[j+1];
                        }
                        temp.pop();
                    }
                }
            }
        liked[_id]=temp;

    }
    function getlikes(uint _id) public view returns(address[] memory){
        return liked[_id];
    }
    

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

    //Functions for Tweets
    function addTweet(string memory _username, string memory _userAt, string memory _date, string memory _text, string memory _cId) public {
        uint id =tweetId;
        tweetId++;
        tweets.push(Tweet(msg.sender ,id, _username, _userAt, _date, _text, _cId));
        
        Tweet[] storage userSpecificTweets= userTweets[msg.sender];
        userSpecificTweets.push(Tweet(msg.sender ,id, _username, _userAt, _date, _text, _cId));
        
        userTweets[msg.sender]=userSpecificTweets;
    }

    function getAllTweets() public view returns(Tweet[] memory){
        return tweets;
    }

    function getUserTweets(address _user) public view returns(Tweet[] memory){
        return userTweets[_user];
    }

    function deleteTweet(uint id) public {
        Tweet[] storage userSpecificTweets = userTweets[msg.sender];
        for(uint i=0; i<tweets.length; i++)
        {
            if(tweets[i].t_id == id){
                require(tweets[i].tweetOwner == msg.sender, "not tweet owner");
                if(tweets.length==1){
                    tweets.pop();
                }
                else{
                    for(uint j=i; j<tweets.length-1;j++){
                        tweets[j]=tweets[j+1];
                    }
                    tweets.pop();
                }
            }
        }
        for (uint i=0;i<userSpecificTweets.length;i++){
            if(userSpecificTweets[i].t_id==id){
                require(userSpecificTweets[i].tweetOwner == msg.sender, "not tweet owner");
                if(userSpecificTweets.length==1){
                    userSpecificTweets.pop();
                    userTweets[msg.sender]=userSpecificTweets;
                }
                else{
                    for(uint j=i; j<userSpecificTweets.length-1;j++){
                    userSpecificTweets[j]=userSpecificTweets[j+1];
                    }
                    userSpecificTweets.pop();
                    userTweets[msg.sender]=userSpecificTweets;
                }
                
            }
        }
    }
    //Functions for Comments
    function addComment(uint p_id, string memory _username, string memory _userAt, string memory _date, string memory _text, string memory _cId) public {
        uint id=tweetId;
        tweetId++;
        Comment memory cmt= Comment(msg.sender, id, p_id, _username, _userAt, _date, _text, _cId);
        Comment[] storage new_cmts =comments[p_id];
        new_cmts.push(cmt); 
        comments[p_id] = new_cmts;
    }
    function getComments(uint p_id) public view returns(Comment[] memory){
        return comments[p_id];
    }
    function deleteComment(uint p_id, uint id) public {
        Comment[] storage temp = comments[p_id];

            for(uint i=0; i<temp.length; i++)
            {
                if(temp[i].c_id == id){
                    require(temp[i].commentOwner == msg.sender, "not comment owner");
                    if(temp.length==1){
                        temp.pop();
                    }
                    else{
                        for(uint j=i; j<temp.length-1;j++){
                            temp[j]=temp[j+1];
                        }
                        temp.pop();
                    }
                }
            }
        comments[p_id]=temp;
    }
    //Functions for Trends
    function addTrend(string memory _name, string memory _location) public  {
        uint id = tweetId;
        tweetId++;
        trends.push(Trend(id,_name,_location, 1));
    }
   
    function getTrends() public view returns(Trend[] memory){
        return trends;
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