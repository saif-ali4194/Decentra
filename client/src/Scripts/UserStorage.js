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
			age: Number(getUserDetail.profile.age),
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
		  return false; // is_default: no, blockchain data is set
		} else {
		  const tmp = signerAddress.toString();
		  const truncatedAddress = tmp.slice(0, 5);
		  const currentDate = new Date();
		  const options = { day: 'numeric', month: 'short', year: 'numeric' };
		  const formattedDate = currentDate.toLocaleString('en-US', options);
		  const loc_user = {
			active_account: signerAddress,
			name: `User${truncatedAddress}`,
			avatar: DefaultAvatar,
			banner: DefaultBanner,
			age: 0,
			gender: "Sex",
			status: "Status",
			country: "Country",
			city: "City",
			occupation: "Occupation",
			date_joined: formattedDate,
			followers: 0,
			following: 0,
			user_following: [],
			user_followed: [],
		  };
		  window.localStorage.setItem("loc_user", JSON.stringify(loc_user));
		  window.dispatchEvent(localStorageUpdated);
		  return true; // is_default: yes, default data is set
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
				age: Number(userDetail.age),
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

