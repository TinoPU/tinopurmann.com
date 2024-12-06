import type { NextRequest } from 'next/server'
import {revalidatePath} from "next/cache";

export async function GET(request: NextRequest) {
    const url = request.nextUrl
    const page = url.searchParams.get('page') || null

    if (!page) {
        return Response.json({ message: 'No Pages Provided' })
    }

    revalidatePath(page)

    return Response.json({ message: `Page updated at url: ${page}` })
}