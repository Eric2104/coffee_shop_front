'use client'
import { useParams } from "next/navigation";
import AddCategory from "../components/addCategory";
import AddCoffee from "../components/addCoffee";
import AddOrigin from "../components/addOrigin";
import SubMenu from "../../components/sub-menu";

const Page = () => {

    const { addInfo } = useParams();
    const callToForm = () => {
        switch (addInfo) {
            case "coffees":
                return <AddCoffee />
            case "categories":
                return <AddCategory />;
            case "origin":
                return <AddOrigin />;
            default:
                return null;
        }
    };

    return (
        <div>
            <SubMenu />
            {callToForm()}
        </div>
    );
};

export default Page;