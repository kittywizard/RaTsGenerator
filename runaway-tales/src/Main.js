import Button from "./components/Button";
import Prompt from "./components/Prompt";
import { toppings } from "./data/toppings";
import {nanoid } from "nanoid";
import Dropdown from "./components/Dropdown";

import useGenerator from "./hooks/useGenerator"


export default function Main() {

    const {getPrompt, chosenPrompts} = useGenerator();

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
            <Dropdown 
                name="theme"
            />
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