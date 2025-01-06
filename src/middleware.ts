import {getSupabaseReqResClient} from "@/supabase-utils/req-res-client";
import type {NextRequest} from 'next/server'


export async function middleware(req: NextRequest,) {
    const {supabase, response} = getSupabaseReqResClient({request: req});

    return response.value;
}