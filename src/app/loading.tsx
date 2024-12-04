import {BlinkBlur} from "react-loading-indicators";
import Image from "next/image";

export default function Loading() {

    return (
        <div className="w-[100vw] h-[100vh] flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-8">
                <Image src={"/assets/TP.png"} width={100} height={100} alt="Tino Purmann .com" className="pl-3"/>
                <BlinkBlur color="#F5DDB2" size="medium" text="" textColor=""/>
            </div>
        </div>
    )
}