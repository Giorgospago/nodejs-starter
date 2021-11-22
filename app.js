// var a = 8;
// var b = 10;

// console.log(a);
// console.log(b);
// console.log(a + b);

// console.log("Hello world !!!");

// const paok = "George";

// console.log(paok);


// const my_table = [5, 6, 123, 45];

// console.log(my_table);

// my_table.push(44);

// console.log(my_table);

// my_table.splice(2, 1);

// console.log(my_table);


// const person = {
//     first_name: "George",
//     last_name: "Pagonoudis",
//     age: 25
// };
 
// console.log(person.first_name + " " + person.last_name);
// console.log(person.age);


// if (person.age > 20) {
//     console.log("Είναι μεγάλος");
// }


// const names = ["George", "Dimos", "Giannis", "Tasos", "Thanos"];

// console.log(names.length);

// console.log("1 for");
// for (let i = 0; i < names.length; i++) {
//     console.log(names[i]);
// }


// console.log("\n2 for");
// for (let name of names) {
//     console.log(name);
// }

// console.log("\n3 for");
// for (let key in names) {
//     console.log(names[key]);
// }

// console.log("\n4 for");
// names.forEach((item, i) => {
//     console.log(item, i);
// });

// console.log("\n5 for");
// names.map((item) => {
//     console.log(item);
// });

const chalk = require("chalk");

const names = [
    "George", 
    "Dimos", 
    "Giannis", 
    "Tasos", 
    "Thanos"
];

for (let name of names) {
    console.log(chalk.bgGreen.black(name));
}








