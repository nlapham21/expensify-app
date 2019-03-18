import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});

test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id,
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1',
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[1], expenses[2]]);
});

test('should add an expense', () => {
    const action = {
        type: 'ADD_EXPENSE',
        expense: expenses[0],
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses, expenses[0]]);
});

test('should edit an expense', () => {
    const newDescription = 'Beef Jerky';
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[0].id,
        updates: {
            description: newDescription,
        },
    };
    const state = expensesReducer(expenses, action);
    expect(state[0].description).toBe(newDescription);
});

test('should not edit an expense if not found', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: '-1',
        updates: {
            description: 'blahblahblah',
        },
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});
