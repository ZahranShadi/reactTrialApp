export default function (state=null, action) {
    switch(action.type) {
        case 'SELECT_PERSON':
            return action.content;
        default:
            return state;
    }
}