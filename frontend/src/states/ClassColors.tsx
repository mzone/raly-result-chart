import {atom} from 'recoil';

export default atom<Array<any>>({
    key: 'classColors',
    default: [
        {
            'class_name': 'JN-1',
            'color': '#d1352b'
        },
        {
            'class_name': 'JN-2',
            'color': '#497db3'
        },
        {
            'class_name': 'JN-3',
            'color': '#68ac57'
        },
        {
            'class_name': 'JN-4',
            'color': '#8e539f'
        },
        {
            'class_name': 'JN-5',
            'color': '#ef8532'
        },
        {
            'class_name': 'JN-6',
            'color': '#fffe61'
        },
        {
            'class_name': 'OP-2',
            'color': '#9c5a33'
        },
        {
            'class_name': 'OP-1',
            'color': '#e888bd'
        },
    ],
});
