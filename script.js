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

    //grab input from dropdown
    // chooseFlavor(list.value);

    //generate number for flavor -- this may need to be changed depending on the dropdown logic
    numberOfFlavors = rats.length - 1;
    let randomFlavor = randomNum(0, numberOfFlavors);

    //random number for the prompt
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

// function chooseFlavor(bunny) {
//     console.log("this does nothing yet! :P");
//     //we have the picked response from the dropdown. by default, it's everything

//     //only pull the flavors that match that theme

//     if() {

//     }
// }

function getList(){
    fetch('local.json')
        .then(response => response.json())
        .then(text => {
            //generate number of prompts for display
            numberOfFlavors = text.length - 1;
            const numberOfPrompts = numberOfFlavors * 30
            flavorAmount.innerText = numberOfPrompts;
            // ^^^ can we find a way to display this as a number, with appropriate commas? i.e. 1,500

            //add all the themes into an array so we can display them
            let groupArray = ["All Bunnies"];
            text.forEach(flavor => {
                groupArray.push(flavor.theme);
            });

            //this will take each element of the array and add it to the dropdown
            groupArray.forEach(element => {
                let option = document.createElement('option');
                option.innerText = element;
                list.appendChild(option);
            });

            //to do list
                // need to get rid of the duplicates
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