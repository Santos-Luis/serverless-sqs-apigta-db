import { DynamoDB } from 'aws-sdk';

const dynamodb = new DynamoDB.DocumentClient();

type CreateUserItem = {
	id: string;
	email: string;
};

export const addNewUser = async (user: CreateUserItem): Promise<CreateUserItem> => {
    const params = { TableName: process.env.USERS_TABLE, Item: user };

    return dynamodb.put(params).promise().then(() => user);
}