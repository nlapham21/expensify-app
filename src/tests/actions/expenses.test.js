import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '21' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '21',
    });
});

test('should setup edit expense action object', () => {
    const action = editExpense('21', { note: 'nolan is a good coder' });
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '21',
        updates: {
            note: 'nolan is a good coder',
        },
    });
});

test('should setup add expense action object with provided values', () => {
    const expenseData = {
        description: 'Rent',
        note: 'This was last months rent',
        amount: 109500,
        createdAt: 1000,
    };
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            ...expenseData,
        },
    });
});

test('should setup add expense action object with default values', () => {
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            description: '',
            note: '',
            amount: 0,
            createdAt: 0,
        },
    });
});
