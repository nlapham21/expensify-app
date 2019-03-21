
export default (expenses) => { // eslint-disable-line
    return expenses
        .map(expense => expense.amount)
        .reduce((sum, value) => sum + value, 0);
};
