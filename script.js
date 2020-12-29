const flavorMax = 2; //can probably get this automatically eventually?

const resultDisplay = document.querySelector(".results");
const desc = document.querySelector(".desc");
const btn = document.getElementById('btn');
const resetBtn = document.getElementById('reset');

let reset = () => location.reload();

btn.addEventListener('click', generateRaT);
resetBtn.addEventListener('click', reset);

async function generateRaT() {

    //hide the description and buttons
    desc.classList.add('hide');
    btn.classList.add('hide');
    resetBtn.classList.remove('hide');

    const promise = await fetch('local.json');
    const rats = await promise.json();

    //variable for the number of available flavors
    const numberOfFlavors = rats.length;

    //generate random number for the flavor
    let randomFlavor = randomNum(0, numberOfFlavors);
    
    //generate random number for the prompt
    let randomPrompt = randomNum(0, 29);

    let flavor = rats[randomFlavor].flavor;
    let prompt = rats[randomFlavor].prompts[randomPrompt];
    let promptNumber = randomPrompt + 1;
    let theme = rats[randomFlavor].theme;
    let color = rats[randomFlavor].color;

    //use provided color in styling the result!

    let div = document.createElement('div');

    div.classList.add('test');
    div.style.color = color;

    div.innerText = `Flavor is: ${flavor} (${theme}) and your prompt is: ${promptNumber}: ${prompt}`;
    resultDisplay.appendChild(div);
}

let randomNum = (min, max) =>  random = Math.floor((Math.random() * (max - min + 1)) + min); 

//json template
// {
//     "flavor": "",
//     "theme": "",
//     "color": "",
//     "prompts": [
        
//     ]
// }