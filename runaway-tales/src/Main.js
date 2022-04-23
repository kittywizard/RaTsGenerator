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

    const promptMap = chosenPrompts.map(prompt => (
        <Prompt 
            data={prompt}
            key={nanoid()}
        />
    ))


    return (
        <main className="container mx-auto flex-col justify-center">
            <p className="p-2 text-sm text-center">
                Runaway Tales is a prompt based writing/art challenge, originally hosted on livejournal, now hosted at  
                <a href="http://wriye.proboards.com" 
                    className="font-bold text-dark-green hover:bg-gray-green-light hover:border-b-1 hover:border-b-black"
                    rel="noreferrer" 
                    target="_blank"
                > WriYe
                </a>, a year round writing community.
                 There are over 3,500 prompts, separated into different 'flavors' based around themes (like emotions, props and actions). Pick one and get started!
            </p>
            <section className="flex justify-center p-6">
                <h2 className="m-2 p-2 font-bold text-2xl text-gray">Generate a Flavor?</h2>
                 <Button 
                    handleClick={getPrompt}
                />
            </section>

            <section className="flex justify-between flex-wrap">
                {promptMap}
            </section>

        </main>
    )
}