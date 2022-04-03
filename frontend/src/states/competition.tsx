import {atom} from 'recoil';

export default atom<undefined | string>({
    key: 'competition',
    // default: 'ラリー丹後2021',
    default: 'ツール・ド・九州 2022 in 唐津',
});
