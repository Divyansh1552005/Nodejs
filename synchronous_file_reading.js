const divyansh = {
    name: "Divyansh",
    age: 25,
    profession: "Developer"
}

console.log(divyansh)


const fs = require('fs');
try {
    const data = fs.readFileSync('notes.txt', 'utf-8');
    console.log(data);
} catch (err) {
    console.error(err);
}




console.log(divyansh.profession)


fs.stat("notes.txt", (err, stats) => {
  if (err) throw err;
  console.log("Is file?", stats.isFile());
  console.log("Size:", stats.size, "bytes");
});