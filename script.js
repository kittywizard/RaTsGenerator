let numberOfFlavors = 0;

const resultDisplay = document.querySelector(".results");
const desc = document.querySelector(".desc");
const btn = document.getElementById('btn');
const resetBtn = document.getElementById('resetBtn');
const toppingBtn = document.getElementById('toppings');
const list = document.getElementById('pick-a-rat');
const flavorAmount = document.querySelector(".flavors");

let toppingList = document.createElement('select');

let reset = () => location.reload();

btn.addEventListener('click', generateRaT);
resetBtn.addEventListener('click', reset);
toppingBtn.addEventListener('click', toppingTime);

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

async function generateRaT() {

    try {
        resetBtn.classList.remove('hide');
        // if(){
        //     //need to check status of toppingBtn
        //     toppingBtn.classList.remove('hide');
        // }

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

    //adding in all the colors as the background would be a good idea here
    //flavorDiv.style.background-color = color; <- maybe?
    flavorDiv.innerText = `Flavor: ${flavor}`;
    resultDisplay.appendChild(flavorDiv);

    let promptDiv = document.createElement('div');
    promptDiv.classList.add('prompt');
    //promptDiv.style.color = color;
    promptDiv.innerText = `#${promptNumber}: ${prompt}`;

    flavorDiv.appendChild(promptDiv);

}
   
async function toppingTime() {
    toppingBtn.classList.add('hide');

    try {
        const toppingPromise = await fetch('toppings.json');
        const toppingContent = await toppingPromise.json();

        //creating drop down list
        toppingList.classList.add('dropdown');
        let containerDiv = document.createElement('div');

        //gather and add all toppings to the dropdown
        toppingContent.forEach(topping => {
            let toppingOption = document.createElement('option');
            toppingOption.innerText = topping.topping;
            toppingList.appendChild(toppingOption);
        });

        //need to add in a div w/ dropdown list of toppings
        containerDiv.appendChild(toppingList);
        containerDiv.appendChild(createButton());

        resultDisplay.appendChild(containerDiv);

    } catch (err) {
        console.log(err);
    }
}

function createButton() {
            
    let btn = document.createElement('button');
    btn.innerText = "Ok";
    btn.classList.add('sm-btn');
    return btn;
}

let randomNum = (min, max) => random = Math.floor((Math.random() * (max - min + 1)) + min);

//json template

// {
//     "flavor": "",
//     "theme": "Romantic Bunnies",
//     "color": "",
//     "prompts": [

//     ]
// }