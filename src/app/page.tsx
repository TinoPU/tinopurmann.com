import React from 'react';
import ContactGrid from "@/components/ContactGrid";
import ProjectsGallery from "@/components/ProjectsGallery";
import ResourcesGallery from "@/components/ResourcesGallery";
import { Client, isFullPage } from '@notionhq/client';
import {Project} from "@/lib/interfaces";
import FindMe from "@/components/FindMe";
import {MapProps} from "@/lib/interfaces";
import {PageObjectResponse} from "@notionhq/client/build/src/api-endpoints";

function getLatestLocation(location_pages: PageObjectResponse[]): MapProps | null {
    if (location_pages.length === 0) return null;

    // Get the latest page
    const latestPage = location_pages[location_pages.length - 1];
    const nameProperty = latestPage.properties['Name'];

    if (nameProperty?.type === 'rich_text' && nameProperty.rich_text.length > 0) {
        const latLngText = nameProperty.rich_text[0].plain_text;
        const [lat, lng] = latLngText.split(',').map(Number);

        return { lat, lng };
    }

    return null;
}

export default async function Home() {
    const notion = new Client({ auth: process.env.NOTION_TOKEN });
    const databaseId = '14326a26061480f59e93cbe28c76ac63';
    const locationDBId = '14426a260614809d9c57e0ade3e5a5e6';

    // Fetch data on the server side
    const response = await notion.databases.query({
        database_id: databaseId,
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
                direction: 'ascending',
            },
        ],
    });

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
                direction: 'ascending',
            },
        ],
    });


    const pages = response.results.filter(isFullPage);
    const location_pages = location_response.results.filter(isFullPage);

    const projects: Project[] = pages.map((page) => {
        const { properties } = page;

        // Initialize default values
        let title = 'Untitled';
        let imageUrl = '/default-image.png';
        let description = 'No description available.';

        // Extract title
        const nameProperty = properties['Name'];
        if (nameProperty?.type === 'title' && nameProperty.title.length > 0) {
            title = nameProperty.title[0].plain_text;
        }

        // Extract image URL
        const imageProperty = properties['Image'];
        if (imageProperty?.type === 'files' && imageProperty.files.length > 0) {
            const file = imageProperty.files[0];
            if (file.type === 'file') {
                imageUrl = file.file.url;
            } else if (file.type === 'external') {
                imageUrl = file.external.url;
            }
        }

        // Extract description
        const descriptionProperty = properties['Description'];
        if (descriptionProperty?.type === 'rich_text' && descriptionProperty.rich_text.length > 0) {
            description = descriptionProperty.rich_text[0].plain_text;
        }

        return {
            id: page.id,
            title,
            imageUrl,
            description,
        };
    });

    const latestLocation = getLatestLocation(location_pages) ?? { lat: 37.7749, lng: -122.4194 };

    return (
        <div className="overflow-hidden justify-start flex flex-col pl-6 pt-6 pb-6 gap-6 no-swipe">
            <ContactGrid />
            <ProjectsGallery projects={projects} />
            <ResourcesGallery />
            <FindMe location={latestLocation} />
        </div>
    );
}
