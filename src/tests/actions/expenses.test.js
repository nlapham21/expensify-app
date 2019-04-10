import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import database from '../../firebase/firebase';
import {
    startAddExpense, addExpense, editExpense, startEditExpense, 
    removeExpense, startRemoveExpense, setExpenses, startSetExpenses,
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';

const uid = 'thisismytestuid';
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt };
    });
    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '21' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '21',
    });
});

test('should remove expense from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const { id } = expenses[0];
    store.dispatch(startRemoveExpense({ id })).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id,
        });
        return database.ref(`users/${uid}/expenses/${actions[0].id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
        done();
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

test('should edit expense from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const { id } = expenses[0];
    const updates = { description: 'lunch' };
    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates,
        });
        return database.ref(`users/${uid}/expenses/${actions[0].id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val().description).toEqual(updates.description);
        done();
    });
});

test('should setup add expense action object with provided values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2],
    });
});

test('should add expense to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This one is better',
        createdAt: 1000,
    };
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData,
            },
        });
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const defaultExpenseData = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0,
    };
    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...defaultExpenseData,
            },
        });
        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(defaultExpenseData);
        done();
    });
});

test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses,
    });
});

test('should fetch the expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses,
        });
        done();
    });
});
