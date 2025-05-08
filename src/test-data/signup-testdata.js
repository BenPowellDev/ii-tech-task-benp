const { faker } = require('@faker-js/faker');

export class TestUser
{
    constructor()
    {
        // Generates random user information using Faker
        this.email = faker.internet.email();
        this.firstName = faker.person.firstName();
        this.lastName = faker.person.lastName();
        this.password = process.env.SHARED_PASSWORD;
        this.address = faker.location.streetAddress();
        this.state = faker.location.state();
        this.city = faker.location.city();
        this.zipcode = faker.location.zipCode();
        this.phoneNumber = faker.phone.number();
    }

    async createTestUser()
    {
        return new TestUser();
    }
}