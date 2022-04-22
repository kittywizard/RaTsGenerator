import { useEffect, useState } from "react"
import Button from "./components/Button";
import { flavorData } from "./data/flavors";
import { toppings } from "./data/toppings";

//import useGenerator from "./hooks/useGenerator"

export default function Main() {

    const [flavors, setFlavors] = useState(flavorData);
    const [chosenPrompts, setChosenPrompts] = useState([]);

    function getPrompt() {
        //generate random number
        let randomFlavorNum = Math.floor((Math.random() * (flavors.length - 0 + 1)) + 0);
        let randomPromptNum = Math.floor((Math.random() * (30 - 0 + 1)) + 0);
        let flavor = flavors[randomFlavorNum];
        let prompt = flavors[randomFlavorNum].prompts[randomPromptNum];

        //need to grab random flavor
        //need to grab random prompt

        //need to update chosenPrompts state to reflect new prompt and create component



    }



    return (
        <main className="container mx-auto flex justify-center">
           <h2 className="m-2 p-2">Generate a Flavor?</h2>
           <Button 
                handleClick={getPrompt}
            />
        </main>
    )
}