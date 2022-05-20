import {atom} from 'recoil';

export default atom<undefined | string>({
    key: 'competition',
    default: '',
});
