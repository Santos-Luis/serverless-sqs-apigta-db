import { SQS } from 'aws-sdk';
import { addNewUser, updateUser } from './repository';

const sqs = new SQS();

type CreateMessageStructure = {
	id: string;
	phoneNumber: number;
	email: string;
};

type UpdateMessageStructure = {
	id: string;
	phoneNumber: number;
};

export const create = async (
	{ body }: { body: string },
	_: undefined,
	callback,
) => {
	const parsedBody: CreateMessageStructure = JSON.parse(body);
	const { id, phoneNumber, email } = parsedBody;
	
	await addNewUser({ id, email });

	await sqs.sendMessage({
		QueueUrl: process.env.QUEUE_URL,
        MessageBody: JSON.stringify(
			{ id, phoneNumber }
		),
	}).promise();

	return callback(null, { statusCode: 201, body: `User ${id} added with sucess` });
};

export const update = async (
	{ body }: { body: string },
	_: undefined,
	callback,
) => {
	const parsedBody: UpdateMessageStructure = JSON.parse(body);
	const { id, phoneNumber } = parsedBody;
	
	await updateUser({ id, phoneNumber });

	return callback(null, { statusCode: 200, body: `User ${id} updated with sucess` });
};
