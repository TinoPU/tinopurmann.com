import {Button} from "@/components/ui/button";
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import React, { useEffect, useState} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Client} from "@notionhq/client";


export default function AddButton({dbId}: {dbId: string}) {
    const [open, setOpen] = useState(false);
    const [link, setLink] = useState("");
    const [message, setMessage] = useState("");
    const [sendButtonDisabled, setSendButtonDisabled] = useState(true);
    const [dataSentSuccessfully, setDataSentSuccessfully] = useState(false);

    const notion = new Client({ auth: process.env.NOTION_TOKEN });

    useEffect(() => {
        if (link !== "" && link) {
            setSendButtonDisabled(false);
        } else {
            setSendButtonDisabled(true);
        }
    }, [link]);

    const sendData = async () => {
        const response = await notion.pages.create({
            parent: {database_id: dbId},
            properties: {
                Name: {
                    title: [
                        {
                            text: {
                                content: link,
                            },
                        },
                    ],
                },
                Notes: {
                    rich_text: [
                        {
                            text: {
                                content: message,
                            },
                        },
                    ],
                },
            },
        }
        );
        setDataSentSuccessfully(true);
        setTimeout(() => {
            setOpen(false);
        }, 1500);
        return response;
    }

    const handleClick = () => {
        setDataSentSuccessfully(false)
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="w-full">
                <Button className="rounded-full">
                    Add
                </Button>
            </SheetTrigger>
            <SheetContent side="bottom">
                <SheetHeader>
                    <SheetTitle className="text-wheat gap-2 flex flex-row">
                        Tell me Something
                    </SheetTitle>
                    {!dataSentSuccessfully ? (
                        <div>
                    <div className="w-full flex justify-center">
                        <Label className="text-input">Link to tool</Label>
                        <Input
                            className="w-full bg-onyx text-white"
                            placeholder="https://cooltool.com"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                        />
                        <Label className="text-area">Add a note (optional)</Label>
                        <Textarea
                            className="w-full bg-onyx text-white"
                            placeholder="Hey there"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>
                    <Button disabled={sendButtonDisabled} className="w-full mb-6 py-7" onClick={sendData}>
                        Send Note
                    </Button>
                        </div>) : (
                        <div className="h-[70vh] flex items-center justify-center flex-col w-full">
                            <div className="flex flex-col items-center justify-center mt-12 gap-3">
                                <p className="text-wheat text-lg font-bold text-center">Thank You!</p>
                                <p className="text-slate-500 text-center">I will check out the tool soon! {"<3".toString()}</p>
                            </div>
                            <Button className="w-full mb-6 py-7 mt-auto" onClick={handleClick}>Add Another
                                Tool</Button>
                        </div>
                    )}
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
}



