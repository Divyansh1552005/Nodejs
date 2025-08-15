const divyansh = {
    name: "Divyansh",
    age: 25,
    profession: "Developer"
}

console.log(divyansh)

const fs = require("fs").promises;

async function main() {
  try {
    await fs.appendFile("notes.txt", " \nHello with promises!\n");
    const data = await fs.readFile("notes.txt", "utf8");
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

main();

console.log(divyansh.profession)


const oke = require("./script")


