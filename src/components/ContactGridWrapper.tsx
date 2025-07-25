// Client wrapper component:
"use client";

import {useState} from "react";
import ContactGrid from "@/components/ContactGrid";

export default function ContactGridWrapper() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`w-full transition-all duration-300 ${isOpen ? "md:w-1/12" : "md:w-2/12"}`}>
            <ContactGrid isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    );
}
