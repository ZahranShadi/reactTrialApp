import {combineReducers} from 'redux';
import PeopleReducer from './reducer-people';
import SelectedPersonReducer from './reducer-selected-person'

const allReducers = combineReducers({
    people: PeopleReducer,
    selectedPerson: SelectedPersonReducer 
})

export default allReducers;