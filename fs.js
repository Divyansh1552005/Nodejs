const divyansh = {
    name: "Divyansh",
    age: 25,
    profession: "Developer"
}

console.log(divyansh)

const text = "oke oke babe less goo";

const fs = require("fs").promises;

async function main() {
  try {
    await fs.appendFile("notes.txt", ` \n${text}\n`);
    const data = await fs.readFile("notes.txt", "utf8");
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

main();

console.log(divyansh.profession)


// const oke = require("./script")


