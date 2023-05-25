import DefaultAvatar from "../Data/Images/avatar.jpg"
import DefaultBanner from "../Data/Images/banner.png"

const localStorageUpdated = new Event('localStorageUpdated');
export const _User =  {
	setUserLocalStorage(getUserDetail, signerAddress) {
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
			user_following: getUserDetail.user_following.map(Number),
			user_followed: getUserDetail.user_followed.map(Number),
		  };
		  window.localStorage.setItem("loc_user", JSON.stringify(loc_user));
		  window.dispatchEvent(localStorageUpdated);
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
		}
	},
	  
	getUserData() {
		const storedUserData = window.localStorage.getItem("loc_user");
		if (storedUserData) {
		  return JSON.parse(storedUserData);
		} else {
		  return null;
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

