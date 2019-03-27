import firebase from 'firebase/app';
import 'firebase/database';

const config = {
    apiKey: 'AIzaSyCj19gJnxwnkA4IzKiVksI4Ki6sSH6fso4',
    authDomain: 'expensify-14c21.firebaseapp.com',
    databaseURL: 'https://expensify-14c21.firebaseio.com',
    projectId: 'expensify-14c21',
    storageBucket: 'expensify-14c21.appspot.com',
    messagingSenderId: '523565359945',
};

firebase.initializeApp(config);

const database = firebase.database();

// child_removed
database.ref('expenses')
    .on('child_removed', (snapshot) => {
        console.log(snapshot.val());
    }, (e) => {
        console.log('Error: ', e);
    });

// // child_changed
// database.ref('expenses')
//     .on('child_changed', (snapshot) => {
//         console.log(snapshot.val());
//     }, (e) => {
//         console.log('Error: ', e);
//     });

// // child_added
// database.ref('expenses')
//     .on('child_added', (snapshot) => {
//         console.log(snapshot.val());
//     }, (e) => {
//         console.log('Error: ', e);
//     });

// database.ref('expenses')
//     .on('value', (snapshot) => {
//         const expenses = [];
//         snapshot.forEach((childSnapshot) => {
//             expenses.push({
//                 id: childSnapshot.key,
//                 ...childSnapshot.val(),
//             });
//         });
//         console.log(expenses);
//     }, (e) => {
//         console.log('Error: ', e);
//     });

// const expenses = [{
//     description: 'Gum',
//     note: '',
//     amount: 195,
//     createdAt: 0,
// }, {
//     description: 'Rent',
//     note: '',
//     amount: 109500,
//     createdAt: 12,
// }, {
//     description: 'Credit Card',
//     note: '',
//     amount: 4500,
//     createdAt: 22,
// }];

// database.ref('expenses').push(expenses[0]);
// database.ref('expenses').push(expenses[1]);
// database.ref('expenses').push(expenses[2]);

// Handling list based data
//
// database.ref('notes').push({
//     title: 'course work',
//     body: 'finish react course',
// });

// Subscribing to changes
//
// const onValueChange = database.ref().on('value', (snapshot) => {
//     console.log(snapshot.val());
// }, (e) => {
//     console.log('Error with data fetching', e);
// });

// database.ref()
//     .once('value')
//     .then((snapshot) => {
//         const val = snapshot.val();
//         console.log(val);
//     }).catch((e) => {
//         console.log('Error: ', e);
//     });

// database.ref().set({
//     name: 'Nolan Lapham',
//     age: 29,
//     stressLevel: 6,
//     job: {
//         title: 'Software Developer',
//         company: 'Google',
//     },
//     location: {
//         city: 'Cambridge',
//         country: 'United States',
//     },
// }).then(() => {
//     console.log('Data is saved');
// }).catch((e) => {
//     console.log('Error: ', e);
// });

// database.ref('isSingle').set(null);

// database.ref().update({
//     stressLevel: 9,
//     'job/company': 'Amazon',
//     'location/city': 'Seattle',
// });

// database.ref()
//     .remove()
//     .then(() => {
//         console.log('Removed successfully');
//     }).catch((e) => {
//         console.log('Error: ', e);
//     });
