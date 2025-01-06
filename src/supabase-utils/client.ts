import { createClient} from "@supabase/supabase-js";



export const createSupabaseClient = () => {
    const supabaseUrl: string = `${process.env.NEXT_PUBLIC_SUPABASE_URL}`;
    const supabaseKey :string = `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
    return createClient(supabaseUrl, supabaseKey);
}