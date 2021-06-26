import * as SQS from 'aws-sdk/clients/sqs';

const sqs = new SQS();

type MessageStructure = {
	id: string;
	phoneNumber: string;
};

export const create = ({ body }, _, callback) => {
	console.log('I got:');
	console.log(body);

	return callback(null, { statusCode: 200, body: 'success' });
};

// export const update = () => {};
