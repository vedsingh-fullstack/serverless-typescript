import { DocumentClient } from "aws-sdk/clients/dynamodb";
import User from "../interface/user.interface";

export default class UserService {
    private tableName: string = "users_dev";

    constructor(private client: DocumentClient) {}

    async getAllUsers(): Promise<User[]> {
        const users = await this.client.scan({
            TableName: this.tableName,
        }).promise()

        return users.Items as User[];
    }
    
    async createUser(user: User): Promise<void> {
        await this.client.put({
            TableName: this.tableName,
            Item: user
        }).promise()
    }

    async updateUser(userId: string, userData: Partial<User>): Promise<User> {
        const user = await this.client.update({
            TableName: this.tableName,
            Key: { userId},
            UpdateExpression: "set #name = :name, #email = :email",
            ExpressionAttributeNames: {
                "#name": "name",
                "#email": "email",
            },
            ExpressionAttributeValues: {
                ":name": userData.name,
                ":email": userData.email,
            },
            ReturnValues: "ALL_NEW",
        }).promise();

        return user.Attributes as User;
    }

    async deleteUser(userId: string): Promise<any> {
        return await this.client.delete({
            TableName: this.tableName,
            Key: {
                userId
            }
        }).promise()
    }
}