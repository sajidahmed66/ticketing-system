import {createBrowserClient} from "@supabase/ssr";


export const getSupabaseBrowserClient = () => {
    const supabaseUrl: string = `${process.env.NEXT_PUBLIC_SUPABASE_URL}`;
    const supabaseKey: string = `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
    return createBrowserClient(supabaseUrl, supabaseKey);
}

