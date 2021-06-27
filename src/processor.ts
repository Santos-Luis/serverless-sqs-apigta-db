import axios from 'axios';
import { UserMessageStructure } from './api';


const URL = `https://${process.env.API_GT_ID}.execute-api.us-east-1.amazonaws.com/dev/update`;

export const anonymizer = async ({ Records: records }) => {
	const [{ body }] = records;

    const message: UserMessageStructure = JSON.parse(body);
    const { phoneNumber } = message;

    const sentBody = {
        ...message,
        phoneNumber: getPhoneNumberAnonymized(phoneNumber),
    };

    await axios.put(URL, sentBody).then(res => console.log(res));
};

const getPhoneNumberAnonymized = (phoneNumber: number): string => {
    const phoneNumberStr = phoneNumber.toString();

    const size = phoneNumberStr.length;
    const middle = Math.floor(size / 2);

    return `${phoneNumberStr.slice(0, middle)}${'*'.repeat(size - middle)}`;
}
