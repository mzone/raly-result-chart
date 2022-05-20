import {atom} from 'recoil';

export default atom<Array<any>>({
    key: 'entrants',
    default: [],
});
