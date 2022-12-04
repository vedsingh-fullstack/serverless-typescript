import UserService from "../../../src/service/user";
import User from "../../../src/interface/user.interface";
import { DynamoDB } from "../../__mocks__/aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

const db = new DynamoDB.DocumentClient() as unknown as DocumentClient;

describe('user service', () => {
    test('it creates the item to dynamodb table', async () => {
        const userData = {
            email: "test@test.com",
            name: "testuser"
        } as User;

        const userService = new UserService(db);

        userService.createUser(userData);

        expect(db.put).toHaveBeenCalledWith({ TableName: "users_dev", Item: { email: userData.email, name: userData.name } });
    })
})