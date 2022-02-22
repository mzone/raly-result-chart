import {atom, selector} from 'recoil';
import axios from "axios";

export default atom<undefined | null>({
    key: 'specialStages',
    default: selector({
        key: 'getSpecialStages',
        get: async ({get}) => {
            try {
                const res = await axios.get('http://localhost:8888/api/specialStages/?cname=rallyTango2021');
                return res.data;
            } catch (error) {
                throw error;
            }
        },
    }),
});
