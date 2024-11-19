// src/lib/interfaces.ts

export interface Project {
    id: string;
    title: string;
    imageUrl: string;
    description: string;
}

export interface ToolProps {
    id: string;
    name: string;
    category: string;
    tags: string[];
    link: string;
    description: string;
    categoryColor: string;
    tagColors: string[];
    user: string[];
    userColors: string[];
    notes: string;
}