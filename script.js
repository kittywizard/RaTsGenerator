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

    resetBtn.classList.remove('hide');

    const promise = await fetch('local.json');
    const rats = await promise.json();

    let selectedArr = [];

    if(list.value != "All Bunnies"){
        rats.forEach(flavor => {
            if(flavor.theme == list.value){
                selectedArr.push(flavor);
                console.log(selectedArr);
            }
        });
        getPrompts(selectedArr);
    } else {
        getPrompts(rats);
    }
}

function getPrompts(rats) {

    numberOfFlavors = rats.length - 1;
    let randomFlavor = randomNum(0, numberOfFlavors);

    let randomPrompt = randomNum(0, 29);

    let flavor = rats[randomFlavor].flavor;
    let prompt = rats[randomFlavor].prompts[randomPrompt];
    let promptNumber = randomPrompt + 1;
    // let theme = rats[randomFlavor].theme;
    // let color = rats[randomFlavor].color;

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
            //generate number of prompts for display
            numberOfFlavors = text.length - 1;
            const numberOfPrompts = numberOfFlavors * 30;
    
            flavorAmount.innerText = numberOfPrompts.toLocaleString();

            //add all the themes into an array so we can display them
            let groupArray = ["All Bunnies"];

            text.forEach(flavor => {
                groupArray.push(flavor.theme);
            });
            let allBunnies = new Set(groupArray);

            allBunnies.forEach(element => {
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