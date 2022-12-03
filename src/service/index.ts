import dynamoDBClient from "../model";
import UserService from "./user";

const userService = new UserService(dynamoDBClient());

export default userService;