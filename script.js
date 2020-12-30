const flavorMax = 2; //can probably get this automatically eventually?

const resultDisplay = document.querySelector(".results");
const desc = document.querySelector(".desc");
const btn = document.getElementById('btn');
const resetBtn = document.getElementById('reset');
const list = document.getElementById('pick-a-rat');

//let reset = () => location.reload(); //maybe not just reset but just run the generate function again?

btn.addEventListener('click', generateRaT);
//resetBtn.addEventListener('click', reset);

async function generateRaT() {

    //hide the description and buttons
    //desc.classList.add('hide');
    //btn.classList.add('hide');
    //resetBtn.classList.remove('hide');

    const promise = await fetch('local.json');
    const rats = await promise.json();

    //variable for the number of available flavors
    const numberOfFlavors = rats.length - 1;

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
            //grab the first group
            let copy = text[0].group;

            // let option = document.createElement('div');
            // option.innerText = copy;
            // document.body.appendChild(option);

            let groupArray = [];

            //run through the entire array
            text.forEach(flavor => {
                groupArray.push(flavor.group);
                console.log(groupArray);

                //so we've got an array with everything in it. 

                // groupArray.forEach(element => {
                //     if(element === copy) {
                //         //this means that the current copy is the same as the array. keep going
                //     } else {
                //         copy = flavor.group;
                //         console.log(`False, Copy is now: ${copy}`);

                //         let option = document.createElement('div');
                //         option.innerText = copy;
                //         document.body.appendChild(option);
                //     }
                // });
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