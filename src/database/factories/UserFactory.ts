import Faker from 'faker'
import { define } from 'typeorm-seeding'
import { User } from '../../../src/api/models/Users/User'

define(User, (faker: typeof Faker) => {
    const gender = faker.random.number(1)
    const firstName = faker.name.firstName(gender)
    const lastName = faker.name.lastName(gender)
    const email = faker.internet.email(firstName, lastName)

    const user = new User()
    user.first_name = firstName
    user.last_name = lastName
    user.email = email
    user.password = 'password'

    return user
})