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

export interface MapProps {
    lat: number;
    lng: number;
}

export interface AudioDevice {
    id: string;
    name: string;
}

export interface NewsletterProps {
    id: string;
    name: string;
    category: string;
    tags: string[];
    link: string;
    info_scope: string;
    info_scopeColor: string;
    categoryColor: string;
    tagColors: string[];
    rating: number;
    notes: string;
    frequency: string
    frequencyColor: string
}
