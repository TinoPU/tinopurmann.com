import type {NewsletterProps} from "@/lib/interfaces";
import {Client, isFullPage} from "@notionhq/client";
import Newsletter from "@/components/ui/newsletter";


export default async function NewsletterList() {
    const notion = new Client({auth: process.env.NOTION_TOKEN});
    const databaseId = '620d64a99cf14a5895f5b1bddae5f39a';

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
                property: 'Rating',
                direction: 'descending',
            },
        ],
    });

    const pages = response.results.filter(isFullPage);

    const newsletters: NewsletterProps[] = pages.map((page) => {
        const {properties} = page;

        // Initialize default values
        let name = 'Untitled';
        let link = 'https://www.google.com/';
        let rating = 1;
        let category = 'Uncategorized';
        let tags: string[] = [];
        let categoryColor = 'wheat';
        let tagColors: string[] = [];
        let info_scope = "Broad";
        let info_scopeColor = 'persian'
        let frequency = "Irregular";
        let frequencyColor = 'onyx'
        let notes = '';

        // Extract title
        const nameProperty = properties['Name'];
        if (nameProperty?.type === 'title' && nameProperty.title.length > 0) {
            name = nameProperty.title[0].plain_text;
        }
        // Extract image URL
        const SignupProperty = properties['Signup'];
        if (SignupProperty?.type === 'url' && SignupProperty.url) {
            link = SignupProperty.url;
        }
        // Extract Rating
        const ratingProperty = properties['Rating'];
        if (ratingProperty?.type === 'number' && ratingProperty.name) {
            rating = ratingProperty.name;
        }

        // Extract info_scope
        const info_scopeProperty = properties['Info Scope'];
        if (info_scopeProperty?.type === 'select' && info_scopeProperty.select) {
            info_scope = info_scopeProperty.select.name;
            info_scopeColor = info_scopeProperty.select.color;
        }

        // Extract frequency
        const frequencyProperty= properties['Frequency'];
        if (frequencyProperty?.type === 'select' && frequencyProperty.select) {
            frequency = frequencyProperty.select.name;
            frequencyColor = frequencyProperty.select.color;
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

        // Extract notes
        const notesProperty = properties['Notes'];
        if (notesProperty?.type === 'rich_text' && notesProperty.rich_text.length > 0) {
            notes = notesProperty.rich_text[0].plain_text;
        }


        return {
            id: page.id,
            name,
            link,
            rating,
            category,
            categoryColor,
            tags,
            tagColors,
            info_scope,
            info_scopeColor,
            frequency,
            frequencyColor,
            notes,

        };
    });


    return (
        <div className="flex flex-col gap-4 w-full overflow-hidden px-4">
            {newsletters.map((newsletter: NewsletterProps) => (
                <Newsletter
                    key={newsletter.id}
                    newsletter={newsletter}
                />
            ))}
        </div>
    )
}