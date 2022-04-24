import {useState, useEffect} from "react";
import { flavorData } from "../data/flavors";
import useDropdown from "./useDropdown";


function useGenerator() {

    const [flavors, setFlavors] = useState(flavorData);
    const {dropdownState} = useDropdown();
    const [chosenPrompts, setChosenPrompts] = useState([]);

    function getPrompt() {

        let promptObj = {};

        console.log(dropdownState)
        //if user hasn't selected anything from the dropdown
        if(dropdownState.theme === "") {
            let randomFlavorNum = Math.floor((Math.random() * (flavors.length - 0 + 1)) + 0);
            let randomPromptNum = Math.floor((Math.random() * (flavors[randomFlavorNum].prompts.length - 0 + 1)) + 0);
    
            let prompt = flavors[randomFlavorNum].prompts[randomPromptNum];
    
            promptObj = {
                prompt: prompt,
                flavor: flavors[randomFlavorNum].flavor,
                number: randomPromptNum,
                promptType: flavors[randomFlavorNum].theme
            }
        } else {
            //need to gather all the flavors that fit the theme given
            //search array? 
            let flavorPrompts = grabFlavors(dropdownState.theme)

            let randomFlavorNum = Math.floor((Math.random() * (flavorPrompts.length - 0 + 1)) + 0);
            let randomPromptNum = Math.floor((Math.random() * (30 - 0 + 1)) + 0);

            promptObj = {
                prompt: prompt,
                flavor: flavors[randomFlavorNum].flavor,
                number: randomPromptNum,
                promptType: flavors[randomFlavorNum].theme
            }
        }
       

        setChosenPrompts(prevState => {
            return [
                ...prevState,
                promptObj
            ]
        });
    }

    const grabFlavors = (theme) => flavors.map(flavor => flavor.theme === theme);

    function generateNumbers(flavorNum, promptNum) {

    }

    return {getPrompt, flavors, chosenPrompts, setChosenPrompts}
}

export default useGenerator;