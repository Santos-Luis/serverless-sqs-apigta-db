import axios from 'axios';

type MessageStructure = {
	id: string;
	phoneNumber: number;
};

const URL = `https://${process.env.API_GT_ID}.execute-api.us-east-1.amazonaws.com/dev/create`;

export const anonymizer = async ({ Records: records }) => {
	const [{ body }] = records;

    const message: MessageStructure = JSON.parse(body);
    const { id, phoneNumber } = message;

    const sentBody = {
        id,
        phoneNumber: getPhoneNumberAnonymized(phoneNumber),
    };

    console.log(sentBody);

    // await axios.post(URL, sentBody).then(res => console.log(res));
};

const getPhoneNumberAnonymized = (phoneNumber: number): string => {
    const phoneNumberStr = phoneNumber.toString();

    const size = phoneNumberStr.length;
    const middle = Math.floor(size / 2);

    return `${phoneNumberStr.slice(0, middle)}${'*'.repeat(size - middle)}`;
}
