import {atom, selector} from 'recoil';
import axios from "../utils/axios";

export default atom<undefined | null>({
    key: 'specialStages',
    default: selector({
        key: 'getSpecialStages',
        get: async ({get}) => {
            const CNAME = "kumakougen2022";
            try {
                const res = await axios.get(`/api/specialStages/?cname=${CNAME}`);
                return res.data;
            } catch (error) {
                throw error;
            }
        },
    }),
});
