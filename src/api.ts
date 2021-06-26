import { SQS } from 'aws-sdk';

const sqs = new SQS();

type CreateMessageStructure = {
	id: string;
	phoneNumber: number;
	email: string;
};

export const create = (
	{ body }: { body: CreateMessageStructure },
	_,
	callback
) => {
	console.log('I got:');
	console.log(body);

	return callback(null, { statusCode: 200, body: 'success' });
};

// export const update = () => {};
