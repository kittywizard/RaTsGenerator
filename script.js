let numberOfFlavors = 0;

const resultDisplay = document.querySelector(".results");
const desc = document.querySelector(".desc");
const btn = document.getElementById('btn');
const resetBtn = document.getElementById('resetBtn');
const list = document.getElementById('pick-a-rat');
const flavorAmount = document.querySelector(".flavors");

//create all the topping related buttons and list
const toppingButton = createButton("Topping?");
const randomButton = createButton("Random Topping?");
const submitButton = createButton("Ok.");
let toppingList = document.createElement('select');

/* 
    to do list:
    need to fix buttons. topping buttons not working properly.
    classlist 'hide' is breaking things
    topping button is only showing up on the latest RaT, not all of them like before
    wrap async functions in try/catch for error handling
*/

/*
    the button only displays on the last generated RaT. 
    once clicked, it applies to ALL RaTs, despite there only being one button
    random generates a random topping for each, and displays on each RaT
    once clicked, the button never reappears on subsequent RaTs
*/

let reset = () => location.reload(); 

btn.addEventListener('click', generateRaT);
resetBtn.addEventListener('click', reset);

async function generateRaT() {

    //wrap everything in try/ catch blocks
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

    //create dropdown list
    toppingList.classList.add('dropdown');
    let containerDiv = document.createElement('div');

    containerDiv.appendChild(toppingButton);
    div.appendChild(containerDiv);

    //gather and add all toppings to the dropdown
    toppingContent.forEach(topping => {
        let toppingOption = document.createElement('option');
        toppingOption.innerText = topping.topping;
        toppingList.appendChild(toppingOption);
    });

    //check for user wanting toppings
    toppingButton.addEventListener('click', () => {
        toppingButton.classList.add('hide');
        div.appendChild(toppingList); 
        div.appendChild(submitButton);
        div.appendChild(randomButton); 
    });

    //if user picks one from the list
    submitButton.addEventListener('click', () => {

        //this will probably need to be condensed since it's repetitive in both instances
        let toppingDiv = document.createElement("div");
        toppingDiv.classList.add('topping-select');

        //need to grab the actual number of the topping
        let toppingDesc = toppingContent[0].claim;

        toppingDiv.innerText = `Your topping is: ${toppingList.value}. ${toppingDesc}`;
        div.appendChild(toppingDiv);

        hideButtons();
    });


    //random button is clicked instead
    randomButton.addEventListener('click', () => {
        let randomTopping = randomNum(0, toppingContent.length - 1);
        let toppingChoice = toppingContent[randomTopping].topping;
        let claimTopping = toppingContent[randomTopping].claim;
    
        // //displaying random topping
        let toppingDiv = document.createElement("div");
        toppingDiv.classList.add('topping-select');
        toppingDiv.innerText = `Your topping is: ${toppingChoice}. ${claimTopping}`;
        div.appendChild(toppingDiv);

        hideButtons(); 
    });
}

function hideButtons() {

    toppingButton.classList.add('hide');
    randomButton.classList.add('hide');
    submitButton.classList.add('hide');
    toppingList.classList.add('hide');
}


function createButton(copy) {
        let btn = document.createElement('button');
        btn.innerText = copy;
        btn.classList.add('sm-btn');
        return btn;
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

    //getToppings(promptDiv);
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