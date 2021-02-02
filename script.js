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
    classlist 'hide' is breaking things
    topping button is only showing up on the latest RaT, not all of them like before
*/

/*
   for some reason, the div w/ the button gets cleared when creating a new div w/ toppings and prompts

*/

let reset = () => location.reload();

btn.addEventListener('click', generateRaT);
resetBtn.addEventListener('click', reset);

async function generateRaT() {

    try {
        resetBtn.classList.remove('hide');

        const promise = await fetch('local.json');
        const rats = await promise.json();

        let selectedArr = [];

        if (list.value != "All Bunnies") {
            rats.forEach(flavor => {
                if (flavor.theme == list.value) {
                    selectedArr.push(flavor);
                }
            });
            getPrompts(selectedArr);
        } else {
            getPrompts(rats);
        }

    } catch (err) {
        console.log(err);
    }

}

// async function showToppings(div) {
//     try {
//         const toppingPromise = await fetch('toppings.json');
//         const toppingContent = await toppingPromise.json();

//         //creating drop down list
//         toppingList.classList.add('dropdown');
//         let containerDiv = document.createElement('div');

//         containerDiv.appendChild(toppingButton);
//         div.appendChild(containerDiv);

//         //gather and add all toppings to the dropdown
//         toppingContent.forEach(topping => {
//             let toppingOption = document.createElement('option');
//             toppingOption.innerText = topping.topping;
//             toppingList.appendChild(toppingOption);
//         });

//         toppingButton.addEventListener('click', () => {
//             toppingButton.classList.add('hide');
//             div.appendChild(toppingList); 
//             div.appendChild(submitButton); 
//         });

//         submitButton.addEventListener('click', () =>{

//             let toppingDiv = document.createElement("div");
//             toppingDiv.classList.add('topping-select');

//             //need to grab the actual number of the topping
//             let toppingDesc = toppingContent[0].claim;

//             toppingDiv.innerText = `Your topping is: ${toppingList.value}. ${toppingDesc}`;
//             div.appendChild(toppingDiv);

//             hideButtons();
//         });


//     } catch (err) {
//         console.log(err);
//     }

// }

function hideButtons() {

    toppingButton.classList.add('hide');
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

    let randomPrompt = randomNum(0, rats[randomFlavor].prompts.length - 1);

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

    //showToppings(promptDiv);
}

function getList() {
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

let randomNum = (min, max) => random = Math.floor((Math.random() * (max - min + 1)) + min);

//json template

// {
//     "flavor": "",
//     "theme": "Romantic Bunnies",
//     "color": "",
//     "prompts": [

//     ]
// }