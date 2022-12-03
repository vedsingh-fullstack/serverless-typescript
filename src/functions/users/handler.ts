import { Context, APIGatewayProxyCallback, APIGatewayEvent } from 'aws-lambda';
import { v4 } from 'uuid';
import User from '../../interface/user.interface';
import userService from "../../service";

const listAllUsers = async (event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback): Promise<void> => {
    const users = await userService.getAllUsers();

    callback(null, {
        statusCode: 200,
        body: JSON.stringify({
            users
        }),
    });

};

const createUser = async (event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback): Promise<void> => {
    try {
        console.log(`Event: ${JSON.stringify(event, null, 2)}`);
        const eventBody = JSON.parse(event.body as string)
        const id = v4();
        await userService.createUser({
            userId: id,
            name: eventBody.name,
            email: eventBody.email,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        })

        callback(null, {
            statusCode: 200,
            body: JSON.stringify({
                message: "User created successfully."
            }),
        });       
    } catch (e) {
        callback(null, {
            statusCode: 500,
            body: JSON.stringify({
                message: `Something Went wrong ${e}`,
            }),
        });  
    }
};

const updateUser = async (event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback): Promise<void> => {
    const userId = event.pathParameters?.userId as string;
    const eventBody = JSON.parse(event.body as string) as User;


    try {
        const user = await userService.updateUser(userId, eventBody)
        callback(null, {
            statusCode: 200,
            body: JSON.stringify({
               user
            }),
        });
    } catch (e) {
        callback(null, {
            statusCode: 500,
            body: JSON.stringify({
                message: `Something Went wrong ${e}`,
            }),
        }); 
    }
}

const deleteUser = async (event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback): Promise<void> => {
    const userId = event.pathParameters?.userId as string;

    try {
        await userService.deleteUser(userId);
        
        callback(null, {
            statusCode: 200,
            body: JSON.stringify({
               message: "User deleted successfully"
            }),
        });
    } catch (e) {
        callback(null, {
            statusCode: 500,
            body: JSON.stringify({
                message: `Something Went wrong ${e}`,
            }),
        }); 
    }
}


export { listAllUsers, createUser, updateUser, deleteUser }