import authReducer from '../../reducers/auth';

test('should return default state', () => {
    const action = {
        type: '',
    };
    const defaultState = {
        test: 'test1234',
    };
    const state = authReducer(defaultState, action);
    expect(state).toEqual(defaultState);
});

test('should set uid for login', () => {
    const uid = 'fasdfs123423';
    const action = {
        type: 'LOGIN',
        uid,
    };
    const state = authReducer({}, action);
    expect(state.uid).toBe(uid);
});

test('should clear uid for logout', () => {
    const action = {
        type: 'LOGOUT',
    };
    const state = authReducer({ uid: 'shouldBeRemoved' }, action);
    expect(state).toEqual({});
});
