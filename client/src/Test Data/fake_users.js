import { faker } from '@faker-js/faker';

function getFollowing() {
    const followers = faker.datatype.number({min: 1000, max: 10000});
    const formattedFollowers = followers >= 1000 ? `${(followers/1000).toFixed(0)}k` : followers;
    return formattedFollowers;
}

const generateUsers = (numUsers) => {
    const users = [];
    for (let i = 0; i < numUsers; i++) {
      const user = {
        id: faker.datatype.uuid(),
        name: faker.name.firstName() + " " + faker.name.lastName(),
        avatar: faker.image.avatar(),
        banner: faker.image.nature(720, 480, true),
        age: faker.datatype.number({ min: 15, max: 80 }),
        gender: faker.name.sex(),
        status: (faker.datatype.boolean())?"Married":"Single",
        country: faker.address.country(),
        city: faker.address.city(),
        occupation: faker.name.jobTitle(),
        date_joined: faker.date.recent().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        followers: getFollowing(),
        following: getFollowing()
      };
      users.push(user);
    }
    return users;
  };
  
  export default generateUsers;