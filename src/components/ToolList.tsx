import type {ToolProps} from "@/lib/interfaces";
import {Client, isFullPage} from "@notionhq/client";
import Tool from "@/components/ui/tool";


export default async function ToolList() {
    const notion = new Client({auth: process.env.NOTION_TOKEN});
    const databaseId = '568b786ce72241509467f609ca0d4f82';

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
                property: 'Name',
                direction: 'ascending',
            },
        ],
    });

    const pages = response.results.filter(isFullPage);

    const tools: ToolProps[] = pages.map((page) => {
        const {properties} = page;

        // Initialize default values
        let name = 'Untitled';
        let link = 'https://www.google.com/';
        let description = 'No description available.';
        let category = 'Uncategorized';
        let tags: string[] = [];
        let categoryColor = 'wheat';
        let tagColors: string[] = [];
        let user: string[] = [];
        let userColors: string[] = [];
        let notes = '';

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
            description = descriptionProperty.rich_text[0].plain_text;
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
        // Extract user
        const userProperty = properties['User'];
        if (userProperty?.type === 'multi_select' && userProperty.multi_select) {
            user = userProperty.multi_select.map((user) => user.name);
            userColors = userProperty.multi_select.map((user) => user.color);
        }
        // Extract notes
        const notesProperty = properties['Notes'];
        if (notesProperty?.type === 'rich_text' && notesProperty.rich_text.length > 0) {
            notes = notesProperty.rich_text[0].plain_text;
        }


        return {
            id: page.id,
            name,
            link,
            description,
            category,
            categoryColor,
            tags,
            tagColors,
            user,
            userColors,
            notes,

        };
    });


    return (
        <div className="flex flex-col gap-4 w-full overflow-hidden px-4">
            {tools.map((tool: ToolProps) => (
                <Tool
                    key={tool.id}
                    tool={tool}
                />
            ))}
        </div>
    )
}