import QuickAccess from "@/components/ui/quickaccess";
import React from "react";
import GoogleMapView from "@/components/GoogleMapView";
import {MapProps} from "@/lib/interfaces";
import {Client, isFullPage} from "@notionhq/client";


export default async function FindMe() {

    const notion = new Client({ auth: process.env.NOTION_TOKEN });
    const locationDBId = '14426a260614809d9c57e0ade3e5a5e6';

    const location_response = await notion.databases.query({
        database_id: locationDBId,
        filter: {
            or: [
                {
                    property: 'Name',
                    rich_text: {
                        is_not_empty: true,
                    },
                }
            ],
        },
        sorts: [
            {
                property: 'Created time',
                direction: 'descending',
            },
        ],
    });



    const location_pages = location_response.results.filter(isFullPage);

    const defaultLocation: MapProps = { lat: 45.578515, lng: -61.233523 };


    const latestLocation: MapProps | null = location_pages.length > 0 ? (() => {
        const nameProperty = location_pages[0].properties['Name'];
        if (nameProperty?.type === 'title' && nameProperty.title.length > 0) {
            const [lat, lng] = nameProperty.title[0].plain_text.split(',').map(parseFloat);
            return { lat, lng };
        }
        return defaultLocation
    })() : defaultLocation;

    const location = latestLocation;

    return (
        <div>
            <div className="text-white text-2xl font-bold">Find me</div>
            <div className="pr-6 rounded-sm">
                <GoogleMapView lat={location.lat} lng={location.lng}/>
            </div>
            <div className="grid grid-cols-2 gap-3 pr-6 md:flex md:flex-row">
                <div className="flex flex-col gap-3 md:flex-row">
                    <QuickAccess image_src="/assets/contact/linkedin.svg" alt_text="Linkedin"
                                 link="https://www.linkedin.com/in/tinopurmann"/>
                    <QuickAccess image_src="/assets/contact/spotify.svg" alt_text="Spotify"
                                 link="https://open.spotify.com/user/119266932?si=1c266ef396104645"/>
                </div>
                <div className="flex flex-col gap-3 md:flex-row">
                    <QuickAccess image_src="/assets/contact/instagram.svg" alt_text="Instagram"
                                 link="https://www.instagram.com/tinopurmann/profilecard/?igsh=MzRlODBiNWFlZA=="/>
                    <QuickAccess image_src="/assets/contact/github.svg" alt_text="GitHub" link="https://github.com/TinoPU"/>
                </div>
            </div>
        </div>
    )
}