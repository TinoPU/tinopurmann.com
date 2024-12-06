import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export default async function GET(request: NextRequest) {
    // Extract the 'page' parameter from the query string
    const { searchParams } = request.nextUrl;
    const page = searchParams.get('page');

    // Ensure the page parameter is provided
    if (!page) {
        return NextResponse.json({ error: 'Missing page parameter.' }, { status: 400 });
    }

    // Trigger revalidation for the specified page
    revalidatePath(page);

    return NextResponse.json({ revalidated: true, page });
}