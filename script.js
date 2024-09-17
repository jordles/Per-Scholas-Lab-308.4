/* -------------------------------------------------------------------------- */
/*                         PART 1 REFACTORING OLD CODE                        */
/* -------------------------------------------------------------------------- */

console.group("Part 1: Refactoring Old Code");

let csv =
	"ID,Name,Occupation,Age\n42,Bruce,Knight,41\n57,Bob,Fry Cook,19\n63,Blaine,Quiz Master,58\n98,Bill,Doctor's Assistant,26";
//SIMPLE SOLUTION

console.group("OLD VERSION");
csv = csv.replace(/,/g, ", ");
let cell = "";
for (let i = 0; i <= csv.length; i++) {
	if (csv[i] === "\n" || i === csv.length) {
		console.log(cell);
		cell = "";
		continue;
	}

	cell += `${csv[i]}`;
}
console.groupEnd();
//changes to...

console.group("IMPROVED VERSION");
let cells = csv.split("\n");
for (let cell of cells) {
	console.log(cell);
}
console.groupEnd();

console.groupEnd();

/* -------------------------------------------------------------------------- */
/*                       PART 2: EXPANDING FUNCTIONALITY                      */
/* -------------------------------------------------------------------------- */
/* Now that you are familiar with your code, and perhaps have improved it, it is time to expand upon its functionality.
Begin with the following task:
Declare a variable that stores the number of columns in each row of data within the CSV.
Instead of hard-coding four columns per row, expand your code to accept any number of columns. This should be calculated dynamically based on the first row of data.
For example, if the first row of data (the headings) has eight entries, your program should create eight entries per row. You can safely assume that all rows that follow will contain the same number of entries per row.
After you have implemented the above:
Store your results in a two-dimensional array.
Each row should be its own array, with individual entries for each column.
Each row should be stored in a parent array, with the heading row located at index 0.
Cache this two-dimensional array in a variable for later use.
Using the original CSV example data, here is what the result of this step should look like:
ID,Name,Occupation,Age\n42,Bruce,Knight,41\n57,Bob,Fry Cook,19\n63,Blaine,Quiz Master,58\n98,Bill,Doctor’s Assistant,26
becomes
[["ID", "Name", "Occupation", "Age"], ["42", "Bruce", "Knight", "41"], ["57", "Bob", "Fry Cook", "19"], ["63", "Blaine", "Quiz Master", "58"], ["98", "Bill", "Doctor’s Assistant", "26"]] */
console.group("Part 2: Expanding Functionality");
csv = "ID,Name,Occupation,Age\n42,Bruce,Knight,41\n57,Bob,Fry Cook,19\n63,Blaine,Quiz Master,58\n98,Bill,Doctor's Assistant,26";
console.log(csv.split("\n").map((row) => row.split(",")));
console.groupEnd();

//group work done in class
/* let rows = csv.split('\n');
let newArr = [];
for(let i = 0; i < rows.length; i++){
  let cells = rows[i].split(',');
  newArr.push(cells);
}
console.log(newArr); */

/* -------------------------------------------------------------------------- */
/*                          PART 3: TRANSFORMING DATA                         */
/* -------------------------------------------------------------------------- */

console.group("Part 3: Transforming Data");
/* While the data is now much more workable than it was in its string format, there is still a large amount of obscurity in the data itself. When we access an arbitrary index of the results array, it is impossible to know what that data is referring to without additional cross-referencing.
In order to make it more obvious what the data is, we will transform our rows into objects.
Implement the following:
For each row of data in the result array produced by your code above, create an object where the key of each value is the heading for that value’s column.
Convert these keys to all lowercase letters for consistency.
Store these objects in an array, in the order that they were originally listed.
Since the heading for each column will be stored in the object keys, you do not need to create an object for the heading row itself.
For instance, the results of the example data above being passed through this step are as follows:
[["ID", "Name", "Occupation", "Age"], ["42", "Bruce", "Knight", "41"], ["57", "Bob", "Fry Cook", "19"], ["63", "Blaine", "Quiz Master", "58"], ["98", "Bill", "Doctor’s Assistant", "26"]]
becomes
[{ id: "42", name: "Bruce", occupation: "Knight", age: "41" }, { id: "57", name: "Bob", occupation: "Fry Cook", age: "19" }, { id: "63", name: "Blaine", occupation: "Quiz Master", age: "58" }, { id: "98", name: "Bill", occupation: "Doctor’s Assistant", age: "26" }]
Important: While this functionality can be built into the original CSV parser you built in Part 2, we are intentionally creating two different algorithms to test different skillsets. Please leave these sections separate even if it would be more efficient to combine them. */

let csv3 = "ID,Name,Occupation,Age\n42,Bruce,Knight,41\n57,Bob,Fry Cook,19\n63,Blaine,Quiz Master,58\n98,Bill,Doctor's Assistant,26";

let arr = csv3.split("\n").map((row) => row.split(","));
let headers = arr[0];
let rows = arr.slice(1);

let results = rows.map((row) => 
  row.reduce((obj, cell, index) => 
    {
      obj[headers[index].toLowerCase()] = cell;
      return obj;
    }, {})
);
console.log(results);
console.groupEnd();

/* -------------------------------------------------------------------------- */
/*                    PART 4: SORTING AND MANIPULATING DATA                   */
/* -------------------------------------------------------------------------- */

console.group("Part 4: Sorting and Manipulating Data")

// It is important to know how to work with data in this format, an array of objects, as it is one of the most commonly used data formats in JavaScript.
// Using array methods, accomplish the following tasks, in order upon the result of Part 3:
// Remove the last element from the sorted array.
console.group('Remove the last element from the sorted array.');
  results.pop();
  console.log(results);
console.groupEnd();

// Insert the following object at index 1:
// { id: "48", name: "Barry", occupation: "Runner", age: "25" }
console.group('Insert the following object at index 1: { id: "48", name: "Barry", occupation: "Runner", age: "25" }');
  results.splice(1, 0, { id: "48", name: "Barry", occupation: "Runner", age: "25" });
  console.log(results);
console.groupEnd();

// Add the following object to the end of the array:
// { id: "7", name: "Bilbo", occupation: "None", age: "111" }
console.group('Add the following object to the end of the array: { id: "7", name: "Bilbo", occupation: "None", age: "111" }');
  results.push({ id: "7", name: "Bilbo", occupation: "None", age: "111" });
console.groupEnd();
// So far, the results should look like this:
// [{ id: "42", name: "Bruce", occupation: "Knight", age: "41" }, { id: "48", name: "Barry", occupation: "Runner", age: "25" }, { id: "57", name: "Bob", occupation: "Fry Cook", age: "19" }, { id: "63", name: "Blaine", occupation: "Quiz Master", age: "58" }, { id: "7", name: "Bilbo", occupation: "None", age: "111" }]
console.group('So Far results should look like this:')
  console.log(results);
console.groupEnd();

// Finally, use the values of each object within the array and the array’s length property to calculate the average age of the group. This calculation should be accomplished using a loop.

console.group('Calculate Average Age of the Group: ')

let averageAge = 0;
for(let key in results){
  averageAge += +results[key].age;
}
averageAge /= results.length;
console.log(`Loop solution: ${averageAge}`);

console.log(`My solution: ${results.reduce((acc, { age }) => acc + +age, 0) / results.length}`);
console.groupEnd();

/* -------------------------------------------------------------------------- */
/*                             PART 5: FULL CIRCLE                            */
/* -------------------------------------------------------------------------- */

console.group('Part 5: Full Circle')
console.log(results);
console.group('reverts back to...')

let headerFC = Object.keys(results[0]).join(',');
console.log(`headers: ${headerFC}`);
let rowsFC = results.map((row) => Object.values(row).join(','));
console.log(`rows: ${rowsFC}`);
let resultFC = [headerFC].concat(rowsFC).join('\\n');
console.log(`%c${resultFC}`, 'background: #222; color: #bada55');
console.groupEnd();

console.groupEnd();