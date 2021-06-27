import { SQS } from 'aws-sdk';
import { addNewUser, updateUser } from './repository';

const sqs = new SQS();

export type UserMessageStructure = {
	id: string;
	phoneNumber: number;
	email: string;
};

export const create = async (
	{ body }: { body: string },
	_: undefined,
	callback,
) => {
	const parsedBody: UserMessageStructure = JSON.parse(body);
	const { id, email } = parsedBody;
	
	await addNewUser({ id, email });

	await sqs.sendMessage({
		QueueUrl: process.env.QUEUE_URL,
        MessageBody: body,
	}).promise();

	return callback(null, { statusCode: 201, body: `User ${parsedBody.id} added with sucess` });
};

export const update = async (
	{ body }: { body: string },
	_: undefined,
	callback,
) => {
	const parsedBody: UserMessageStructure = JSON.parse(body);
	
	await updateUser(parsedBody);

	return callback(null, { statusCode: 200, body: `User ${parsedBody.id} updated with sucess` });
};
