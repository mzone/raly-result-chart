import {atom, selector} from 'recoil';
import axios from "axios";

export default atom<undefined | null>({
    key: 'entrants',
    default: selector({
        key: 'getEntrants',
        get: async ({get}) => {
            const CNAME = "karatsu2022";
            try {
                const res = await axios.get(`http://localhost:8888/api/entrants/?cname=${CNAME}`);
                return res.data.entrants;
            } catch (error) {
                throw error;
            }
        },
    }),
});
