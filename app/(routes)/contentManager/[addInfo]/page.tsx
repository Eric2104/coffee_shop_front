"use client"
import { useState } from "react";
import { useParams } from "next/navigation";
import SubMenu from "../components/sub-menu";
import AddCategory from "./components/addCategory";
import AddCoffee from "./components/addCoffee";
import AddOrigin from "./components/addOrigin";

const Page = () => {

    const [view, setView] = useState("coffees");
    const {addInfo} = useParams()

    const callToForm = () => {
        switch (addInfo) {
            case "coffees":
                return <AddCoffee />

            case "categories":
                return <AddCategory />
            case "origin":
                return <AddOrigin />
            default:
                break;
        }
    }

    return (
        <div>
            <SubMenu  />
            {callToForm()}
        </div>
    );
};

export default Page;