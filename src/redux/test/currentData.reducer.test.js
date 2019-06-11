import currentDataReducer from '../reducers/currentData.js';
import currentData from '../reducers/currentData.js';

test('currentData reducer should initially be an empty object', () => {
    const action = {};
    const returnedState = currentDataReducer(undefined, action);
    expect(typeof returnedState).toBe('object');
    expect(Object.keys(returnedState).length).toBe(0);
})

test('currentData should return payload when called with SET_CURRENT_DATA', () => {
    const action={type: 'SET_CURRENT_DATA', payload:{temp:85, hi:85, humidity:.45, light: .17}};
    const returnedState = currentDataReducer(undefined, action);
    expect(typeof returnedState).toBe('object');
    expect(Object.keys(returnedState).length > 0).toBe(true);
})

test('currentData should ignore actions that dont apply IGNORE_ME', () => {
    const action={type: 'IGNORE_ME'}
    const returnedState = currentDataReducer(undefined, action);
    expect(typeof returnedState).toBe('object');
    expect(Object.keys(returnedState).length).toBe(0);
})