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
            }
        });
        getPrompts(selectedArr);
    } else {
        getPrompts(rats);
    }
}

async function getToppings(div){
    const toppingPromise = await fetch('toppings.json');
    const toppingContent = await toppingPromise.json();

    //random topping generating
    // let randomTopping = randomNum(0, toppingContent.length - 1);
    // let toppingChoice = toppingContent[randomTopping].topping;
    // let claimTopping = toppingContent[randomTopping].claim;

    // //displaying random topping
    // let toppingDiv = document.createElement("div");
    // toppingDiv.classList.add('topping-select');
    // toppingDiv.innerText = `Your topping is: ${toppingChoice}. ${claimTopping}`;
    // div.appendChild(toppingDiv);

    createToppingList(toppingContent, div);
}

function createToppingList(toppings, div) {
    let toppingList = document.createElement('select');
    toppingList.classList.add('dropdown');
    let containerDiv = document.createElement('div');

    let toppingButton = document.createElement('button');
    toppingButton.innerText = "Topping?";
    toppingButton.classList.add('sm-btn');

    toppings.forEach(topping => {
        let toppingOption = document.createElement('option');
        toppingOption.innerText = topping.topping;
        toppingList.appendChild(toppingOption);
    });

    //containerDiv.appendChild(toppingList);
    containerDiv.appendChild(toppingButton);
    div.appendChild(containerDiv);
    toppingButton.addEventListener('click', function() {
        //
    });

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

    getToppings(promptDiv);
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
//     "theme": "Odds & Ends",
//     "color": "",
//     "prompts": [
        
//     ]
// }