import React from 'react';
import ContactGrid from "@/components/ContactGrid";
import ProjectsGallery from "@/components/ProjectsGallery";
import ResourcesGallery from "@/components/ResourcesGallery";
import { Client, isFullPage } from '@notionhq/client';
import {Project} from "@/lib/interfaces";



export default async function Home() {
    const notion = new Client({ auth: process.env.NOTION_TOKEN });
    const databaseId = '14326a26061480f59e93cbe28c76ac63';

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


    const pages = response.results.filter(isFullPage);

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

    return (
        <div className="overflow-hidden bg-black justify-start flex flex-col pl-6 pt-6 gap-6">
            <ContactGrid />
            <ProjectsGallery projects={projects} />
            <ResourcesGallery />
        </div>
    );
}
