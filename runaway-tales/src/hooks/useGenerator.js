import {useState, useEffect} from "react";
import { flavorData } from "../data/flavors";


function useGenerator() {

    const [flavors, setFlavors] = useState(flavorData);
    const [chosenPrompts, setChosenPrompts] = useState([]);

    function getPrompt() {
        //generate random number
        let randomFlavorNum = Math.floor((Math.random() * (flavors.length - 0 + 1)) + 0);
        let randomPromptNum = Math.floor((Math.random() * (30 - 0 + 1)) + 0);

        let prompt = flavors[randomFlavorNum].prompts[randomPromptNum];

        let promptObj = {
            prompt: prompt,
            flavor: flavors[randomFlavorNum].flavor,
            number: randomPromptNum,
            promptType: flavors[randomFlavorNum].theme
        }

        setChosenPrompts(prevState => {
            return [
                ...prevState,
                promptObj
            ]
        });
    }

    return {getPrompt, flavors, chosenPrompts, setChosenPrompts}
}

export default useGenerator;