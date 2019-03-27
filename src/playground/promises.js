
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({
            name: 'Nolan',
            age: 29,
        });
        // reject('something went wrong');
    }, 2000);
});

console.log('before');

promise.then((data) => {
    console.log('1', data);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('This is my other promise');
        }, 2000);
    });
}).then((data) => {
    console.log('does this run?', data);
}).catch((error) => {
    console.log('Error: ', error);
});

console.log('after');
