import { useEffect, useState } from "react"
import Button from "./components/Button";
import Prompt from "./components/Prompt";
import { flavorData } from "./data/flavors";
import { toppings } from "./data/toppings";
import {nanoid } from "nanoid";

//import useGenerator from "./hooks/useGenerator"

export default function Main() {

    const [flavors, setFlavors] = useState(flavorData);
    const [chosenPrompts, setChosenPrompts] = useState([]);

    function getPrompt() {
        //generate random number
        let randomFlavorNum = Math.floor((Math.random() * (flavors.length - 0 + 1)) + 0);
        let randomPromptNum = Math.floor((Math.random() * (30 - 0 + 1)) + 0);
        let prompt = flavors[randomFlavorNum].prompts[randomPromptNum];

        console.log(prompt)
        setChosenPrompts(prevState => {
            return [
                ...prevState,
                prompt
            ]
        });
    }

    const promptMap = chosenPrompts.map(prompt => (
        <Prompt 
            prompt={prompt}
            key={nanoid()}
        />
    ))


    return (
        <main className="container mx-auto flex-col justify-center">
           <h2 className="m-2 p-2">Generate a Flavor?</h2>
           <Button 
                handleClick={getPrompt}
            />
            <section className="flex justify-between flex-wrap">
                {promptMap}
            </section>

        </main>
    )
}