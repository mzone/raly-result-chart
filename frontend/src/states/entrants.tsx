import {atom, selector} from 'recoil';
import axios from "../utils/axios";

export default atom<undefined | null>({
    key: 'entrants',
    default: selector({
        key: 'getEntrants',
        get: async ({get}) => {
            const CNAME = "kumakougen2022";
            try {
                const res = await axios.get(`/api/entrants/?cname=${CNAME}`);
                return res.data.entrants;
            } catch (error) {
                throw error;
            }
        },
    }),
});
