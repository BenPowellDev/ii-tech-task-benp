const { faker } = require('@faker-js/faker');

export class creditCard
{
    constructor()
    {
        // Generates random credit card info using Faker
        this.name = faker.person.fullName();
        this.cardNumber = faker.finance.creditCardNumber();
        this.cvv = faker.finance.creditCardCVV();
        this.expiryMonth = faker.date.month();
        this.expiryYear = "2049";
    }

    async createCreditCard()
    {
        return new creditCard();
    }
}