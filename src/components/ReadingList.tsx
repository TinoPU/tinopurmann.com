import type {ReadingProps} from "@/lib/interfaces";
import {Client, isFullPage} from "@notionhq/client";
import Reading from "@/components/ui/reading";


export default async function ReadingList() {
    const notion = new Client({auth: process.env.NOTION_TOKEN});
    const databaseId = '260fa349f5d6478ea94721f2226534f2';

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
                direction: 'descending',
            },
        ],
    });

    const pages = response.results.filter(isFullPage);

    const readings: ReadingProps[] = pages.map((page) => {
        const {properties} = page;

        // Initialize default values
        let name = 'Untitled';
        let link = 'https://www.google.com/';
        let category = 'Uncategorized';
        let tags: string[] = [];
        let categoryColor = 'wheat';
        let tagColors: string[] = [];
        let description = 'No description available.';

        // Extract title
        const nameProperty = properties['Name'];
        if (nameProperty?.type === 'title' && nameProperty.title.length > 0) {
            name = nameProperty.title[0].plain_text;
        }
        // Extract image URL
        const LinkProperty = properties['Link'];
        if (LinkProperty?.type === 'url' && LinkProperty.url) {
            link = LinkProperty.url;
        }
        // Extract description
        const descriptionProperty = properties['Description'];
        if (descriptionProperty?.type === 'rich_text' && descriptionProperty.rich_text.length > 0) {
            description = descriptionProperty.rich_text.map(text => text.plain_text).join('');
        }
        // Extract category
        const categoryProperty = properties['Category'];
        if (categoryProperty?.type === 'select' && categoryProperty.select) {
            category = categoryProperty.select.name;
            categoryColor = categoryProperty.select.color;
        }

        // Extract tags
        const tagsProperty = properties['Tags'];
        if (tagsProperty?.type === 'multi_select' && tagsProperty.multi_select) {
            tags = tagsProperty.multi_select.map((tag) => tag.name);
            tagColors = tagsProperty.multi_select.map((tag) => tag.color);
        }


        return {
            id: page.id,
            name,
            link,
            category,
            categoryColor,
            tags,
            tagColors,
            description
        };
    });

    return (
        <div className="flex flex-col gap-4 w-full overflow-hidden px-4">
            {readings.map((reading: ReadingProps) => (
                <Reading
                    key={reading.id}
                    reading={reading}
                />
            ))}
        </div>
    )
}