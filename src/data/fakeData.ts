import { faker } from "@faker-js/faker";
export class Data {
    public static signupInfo = {
        fullName: faker.person.fullName(),
        password: faker.internet.password(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        companyName: faker.company.name(),
        firstAddress: faker.location.streetAddress(),
        secondAddress: faker.location.street(),
        state: faker.location.state(),
        city: faker.location.city(),
        zipCode: faker.location.zipCode(),
        mobileNumber: faker.phone.number(),
    };
}