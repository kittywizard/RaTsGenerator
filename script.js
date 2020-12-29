const flavorMax = 2; //can probably get this automatically eventually?

const resultDisplay = document.querySelector(".results");

document.getElementById('btn').addEventListener('click', generateRaT);

async function generateRaT() {
    const promise = await fetch('local.json');
    const rats = await promise.json();

    //generate random number for the flavor
    let flavorNum = randomNum(0, 1);
    
    //generate random number for the prompt
    let promptNum = randomNum(0, 29);

    //pull the correct ones from json. 


    // let array = rats[0].prompts[0];
    // console.log(array);
    let flavor = rats[flavorNum].flavor;
    let prompt = rats[flavorNum].prompts[promptNum];
    console.log(flavor);

    //add to html. append to results
    let div = document.createElement('div');
    div.innerText = `Flavor is: ${flavor} and your prompt is: ${prompt}`;
    resultDisplay.appendChild(div);
}

let randomNum = (min, max) =>  random = Math.floor((Math.random() * (max - min + 1)) + min); 
