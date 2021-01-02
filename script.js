let numberOfFlavors = 0;

const resultDisplay = document.querySelector(".results");
const desc = document.querySelector(".desc");
const btn = document.getElementById('btn');
const resetBtn = document.getElementById('resetBtn');
const list = document.getElementById('pick-a-rat');
const flavorAmount = document.querySelector(".flavors");

let reset = () => location.reload(); 

btn.addEventListener('click', generateRaT);
resetBtn.addEventListener('click', reset);

async function generateRaT() {

    //hide the description and buttons
    //desc.classList.add('hide');
    //btn.classList.add('hide');
    resetBtn.classList.remove('hide');

    const promise = await fetch('local.json');
    const rats = await promise.json();

    numberOfFlavors = rats.length - 1;

    //generate random number for the flavor
    let randomFlavor = randomNum(0, numberOfFlavors);
    
    //generate random number for the prompt
    let randomPrompt = randomNum(0, 29);

    let flavor = rats[randomFlavor].flavor;
    let prompt = rats[randomFlavor].prompts[randomPrompt];
    let promptNumber = randomPrompt + 1;
    let theme = rats[randomFlavor].theme;
    let color = rats[randomFlavor].color;

    //creating html elements for display
    let flavorDiv = document.createElement('div');
    flavorDiv.classList.add('flavor');
    //flavorDiv.style.color = color;
    flavorDiv.innerText = `Flavor: ${flavor}`;
    resultDisplay.appendChild(flavorDiv);

    let promptDiv = document.createElement('div');
    promptDiv.classList.add('prompt');
    //promptDiv.style.color = color;
    promptDiv.innerText = `#${promptNumber}: ${prompt}`;

    flavorDiv.appendChild(promptDiv);
}

function getList(){
    fetch('local.json')
        .then(response => response.json())
        .then(text => {
            // let option = document.createElement('div');
            // option.innerText = copy;
            // document.body.appendChild(option);

            //generate the number of prompts
            numberOfFlavors = text.length - 1;
            const numberOfPrompts = numberOfFlavors * 30
            flavorAmount.innerText = numberOfPrompts;


            let groupArray = ["All Bunnies"];

            //run through the entire array
            text.forEach(flavor => {
                groupArray.push(flavor.theme);
            });

            //this will take each element of the array and add it to the dropdown
            groupArray.forEach(element => {
                let option = document.createElement('option');
                option.innerText = element;
                list.appendChild(option);
            });
        });
}

getList();

let randomNum = (min, max) =>  random = Math.floor((Math.random() * (max - min + 1)) + min); 

//json template
// {
//     "flavor": "",
//     "theme": "",
//     "color": "",
//     "prompts": [
        
//     ]
// }