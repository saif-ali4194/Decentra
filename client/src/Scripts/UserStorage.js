import DefaultAvatar from "../Data/Images/avatar.jpg"
import DefaultBanner from "../Data/Images/banner.png"

export const _User =  {
	setUserLocalStorage(getUserDetail, signerAddress) {
		if (getUserDetail.profile.name) {
		  const loc_user = {
			active_account: signerAddress,
			name: getUserDetail.profile.name,
			avatar: getUserDetail.profile.avatar,
			banner: getUserDetail.profile.banner,
			age: getUserDetail.profile.age,
			gender: getUserDetail.profile.age,
			status: getUserDetail.profile.staus,
			country: getUserDetail.profile.country,
			city: getUserDetail.profile.city,
			occupation: getUserDetail.occupation,
			date_joined: getUserDetail.date_joined,
			followers: getUserDetail.followers,
			following: getUserDetail.following,
			user_following: getUserDetail.user_following,
			user_followed: getUserDetail.user_followed,
		  };
		  window.localStorage.setItem("loc_user", JSON.stringify(loc_user));
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

