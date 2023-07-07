import DefaultAvatar from "../Data/Images/avatar.jpg"
import DefaultBanner from "../Data/Images/banner.png"

const localStorageUpdated = new Event('localStorageUpdated');
export const _User =  {
	setUserLocalStorage(getUserDetail, signerAddress) {
		window.localStorage.removeItem("loc_user");
		let userfollowing = (getUserDetail.user_following != 0 )? getUserDetail.user_following : [];
		let userfollowed = (getUserDetail.user_followed != 0 ) ? getUserDetail.user_followed : [];
		if (getUserDetail.profile.name) {
		  const loc_user = {
			active_account: signerAddress,
			name: getUserDetail.profile.name,
			avatar: getUserDetail.profile.avatar,
			banner: getUserDetail.profile.banner,
			age: getUserDetail.profile.age,
			gender: getUserDetail.profile.gender,
			status: getUserDetail.profile.status,
			country: getUserDetail.profile.country,
			city: getUserDetail.profile.city,
			occupation: getUserDetail.occupation,
			date_joined: getUserDetail.date_joined,
			followers: Number(getUserDetail.followers),
			following: Number(getUserDetail.following),
			user_following: userfollowing.map(String),
			user_followed: userfollowed.map(String),
		  };
		  window.localStorage.setItem("loc_user", JSON.stringify(loc_user));
		  window.dispatchEvent(localStorageUpdated);
		//   return false; // is_default: no, blockchain data is set
		} 
	},
	  
	getUserData() {
		const storedUserData = window.localStorage.getItem("loc_user");
		if (storedUserData) {
		  return JSON.parse(storedUserData);
		} else {
		  return null;
		}
	},

	setData(userDetail) {
		if (userDetail) {
				let loc_user = {
				active_account: userDetail.active_account,
				name: userDetail.name,
				avatar: userDetail.avatar,
				banner: userDetail.banner,
				age: userDetail.age,
				gender: userDetail.gender,
				status: userDetail.status,
				country: userDetail.country,
				city: userDetail.city,
				occupation: userDetail.occupation,
				date_joined: userDetail.date_joined,
				followers: Number(userDetail.followers),
				following: Number(userDetail.following),
				user_following: userDetail.user_following.map(String),
				user_followed: userDetail.user_followed.map(String),
			}
			window.localStorage.setItem("loc_user", JSON.stringify(loc_user));
		  	window.dispatchEvent(localStorageUpdated);
		}
	},

	setUser(userDetail) {
		if (userDetail) {
				let loc_user = {
				active_account: userDetail.userAddress,
				name: userDetail.profile.name,
				avatar: userDetail.profile.avatar,
				banner: userDetail.profile.banner,
				age: userDetail.profile.age,
				gender: userDetail.profile.gender,
				status: userDetail.profile.status,
				country: userDetail.profile.country,
				city: userDetail.profile.city,
				occupation: userDetail.occupation,
				date_joined: userDetail.date_joined,
				followers: Number(userDetail.followers),
				following: Number(userDetail.following),
				user_following: userDetail.user_following.map(String),
				user_followed: userDetail.user_followed.map(String),
			}
			window.localStorage.setItem("loc_user", JSON.stringify(loc_user));
		  	window.dispatchEvent(localStorageUpdated);
		}
	}
};


export const _Auth = {
	get_auth() {
		let auth = window.localStorage.getItem("auth");
		return (auth)?auth:false;
	},
	
	set_auth(isAuth) {
		window.localStorage.setItem("auth", isAuth);	
	}
}

