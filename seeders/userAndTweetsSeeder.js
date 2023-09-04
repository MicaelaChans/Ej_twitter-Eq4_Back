/**
 * El seeder no es más que un archivo que contiene una función que se encarga
 * de insertar datos (generalmente de prueba) en una base de datos.
 *
 * El nombre "seeder" es una convención y significa "semillero".
 *
 * Además, en este caso, se está usando una librería llamada Faker
 * (https://fakerjs.dev/) para facilitar la creación de datos ficticios como
 * nombres, apellidos, títulos, direcciones y demás textos.
 *
 * Suele ser común que en los seeders exista un `for` donde se define la
 * cantidad de registros de prueba que se insertarán en la base de datos.
 *
 */

const { faker } = require("@faker-js/faker");
const User = require("../models/User");
const Tweet = require("../models/Tweet");
const bcrypt = require("bcryptjs");

faker.locale = "es";

async function userSeeders() {
  const users = [];
  const userTweets = [];

  const passwordHash = await bcrypt.hash("1234", 10);

  for (let i = 0; i < 15; i++) {
    const user = new User({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      username: faker.internet.userName(),
      password: passwordHash.toString(),
      email: faker.internet.email(),
      bio: faker.lorem.text(10),
      profilePic: faker.internet.avatar(),
    });
    users.push(user);

    for (let j = 0; j < 10; j++) {
      userTweets.push(
        new Tweet({
          content: faker.lorem.paragraph(),
          author: user,
          likes: faker.helpers.arrayElements(users, Math.random() * 10),
        }),
      );
    }

    user.tweetsList = userTweets;
    user.followingUsers = faker.helpers.arrayElements(users, Math.random() * 10);
    user.followersUsers = faker.helpers.arrayElements(users, Math.random() * 10);
  }

  await User.insertMany(users);
  console.log("[Database] Se corrió el seeder de Users.");
  await Tweet.insertMany(userTweets);
  console.log("[Database] Se corrió el seeder de Tweets.");
}

module.exports = userSeeders;
