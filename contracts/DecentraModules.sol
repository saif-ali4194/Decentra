// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract DecentraModules{
    address public owner;
    
    constructor() {
        owner = msg.sender;
    }

    struct Tweet{
        address tweetOwner;
        uint256 t_id;     
        string username;
        string userAt;
        string date;
        string text;
        string cId;
        uint likes;
        uint dislikes;
        

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
        uint likes;
        uint dislikes;
        string avatar;
        
        
    }

    struct Trend{
        uint256 t_id;
        string t_name;
        string t_location;
        
    }

    mapping (uint => uint) public mentions;
    Trend[] public trends;
    mapping (uint => Comment[]) public comments; 
    mapping (uint => address[]) public liked;
    mapping (uint => address[]) public disliked;

    uint256 tweetId=1000;
    Tweet[] public tweets;
    Comment[] public cmtarr;
    mapping (address => Tweet[]) public userTweets;

    function ratio(uint index,bool comment) public {
        int deletionLimit = -80;
        int ratioAmount;
        if(!comment){
            ratioAmount=(int(tweets[index].likes)*100)-(int(tweets[index].dislikes)*100);
            ratioAmount=ratioAmount/(int(tweets[index].likes)+int(tweets[index].dislikes));
            if(ratioAmount<=deletionLimit && tweets[index].likes>=1){
                deleteTweetregardless(tweets[index].t_id);
            }
        }
        else{
             ratioAmount=(int(cmtarr[index].likes)*100)-(int(cmtarr[index].dislikes)*100);
            ratioAmount=ratioAmount/(int(cmtarr[index].likes)+int(cmtarr[index].dislikes));
            if(ratioAmount<=deletionLimit && cmtarr[index].likes>=1){
                    deleteCommentregardless(cmtarr[index].p_id, cmtarr[index].c_id);
            }
        }
        
    }

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
            bool comment=true;
            for(uint i=0;i<tweets.length;i++){
                if(tweets[i].t_id == _id){
                    tweets[i].likes++;
                    comment=false;
                    break;
                }
            }
            if(comment){
                    for(uint i=0;i<cmtarr.length;i++){
                        if(cmtarr[i].c_id == _id){
                            cmtarr[i].likes++;
                            break;
                        }
                }
            }
    }
    function removeLike(uint _id) public{
        address[] storage temp =liked[_id];
        bool comment=true;
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
         for(uint i=0;i<tweets.length;i++){
            if(tweets[i].t_id == _id){
                tweets[i].likes--;
                comment=false;
                if(tweets[i].likes>=1){
                    ratio(i,comment);
                }
                break;
            }
        }
         if(comment){
                    for(uint i=0;i<cmtarr.length;i++){
                        if(cmtarr[i].c_id == _id){
                            cmtarr[i].likes--;
                            if(cmtarr[i].likes>=1){
                                ratio(i,comment);
                            }
                            break;
                        }
                }
            }

    }
    function getlikes(uint _id) public view returns(address[] memory){
        return liked[_id];
    }
    
     function addDislike(uint _id) public {
        address[] storage temp = disliked[_id];
        bool comment=true;
        temp.push(msg.sender);
        disliked[_id]=temp;
         for(uint i=0;i<tweets.length;i++){
            if(tweets[i].t_id == _id){
                tweets[i].dislikes++;
                comment=false;
                if(tweets[i].likes>=1){
                    ratio(i,comment);
                }
                break;
            }
        }
         if(comment){
                    for(uint i=0;i<cmtarr.length;i++){
                        if(cmtarr[i].c_id == _id){
                            cmtarr[i].dislikes++;
                            if(cmtarr[i].likes>=1){
                                ratio(i,comment);
                            }
                            break;
                        }
                }
            }


    }

    function removeDislike(uint _id) public{
        address[] storage temp =disliked[_id];
        bool comment=true;
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
        disliked[_id]=temp;

         for(uint i=0;i<tweets.length;i++){
            if(tweets[i].t_id == _id){
                tweets[i].dislikes--;
                comment=false;
                break;
            }
        }
         if(comment){
                    for(uint i=0;i<cmtarr.length;i++){
                        if(cmtarr[i].c_id == _id){
                            cmtarr[i].dislikes--;
                            break;
                        }
                }
            }


    }

      function getdislikes(uint _id) public view returns(address[] memory){
        return disliked[_id];
    }

     //Functions for Tweets
    function addTweet(string memory _username, string memory _userAt, string memory _date, string memory _text, string memory _cId) public {
        uint id =tweetId;
        tweetId++;
        tweets.push(Tweet(msg.sender ,id, _username, _userAt, _date, _text, _cId,0,0));
        
        Tweet[] storage userSpecificTweets= userTweets[msg.sender];
        userSpecificTweets.push(Tweet(msg.sender ,id, _username, _userAt, _date, _text, _cId,0,0));
        
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
      function deleteTweetregardless(uint id) public {
        Tweet[] storage userSpecificTweets = userTweets[msg.sender];
        for(uint i=0; i<tweets.length; i++)
        {
            if(tweets[i].t_id == id){
                // require(tweets[i].tweetOwner == msg.sender, "not tweet owner");
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
    function addComment(uint p_id, string memory _username, string memory _userAt, string memory _date, string memory _text, string memory _cId, string memory _avatar) public {
        uint id=tweetId;
        tweetId++;
        Comment memory cmt= Comment(msg.sender, id, p_id, _username, _userAt, _date, _text, _cId,0,0,_avatar);
        cmtarr.push(Comment(msg.sender, id, p_id, _username, _userAt, _date, _text, _cId,0,0,_avatar));
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
    function deleteCommentregardless(uint p_id, uint id) public {
        Comment[] storage temp = comments[p_id];

            for(uint i=0; i<temp.length; i++)
            {
                if(temp[i].c_id == id){
                    // require(temp[i].commentOwner == msg.sender, "not comment owner");
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
        bool exists =false;
        uint tempMentions;
       
        for(uint i=0;i<trends.length;i++){
            if(stringsEquals(trends[i].t_name, _name)){
                exists = true;
                id=trends[i].t_id;
                break;
            }
        }
       
       if(exists){
            tempMentions=mentions[id];
            tempMentions++;
            mentions[id]=tempMentions;
        }else{
            tweetId++;
            trends.push(Trend(id,_name,_location));
            mentions[id]=1;
        }
        
    }
   
    function getTrends() public view returns(Trend[] memory){
        return trends;
    }
    function getMentions(uint _id) public view returns(uint){
        return mentions[_id];
    }
}