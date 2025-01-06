import {createServerClient} from "@supabase/ssr";


export const getSupabaseServerClient = () => {
    const supabaseUrl: string = `${process.env.NEXT_PUBLIC_SUPABASE_URL}`;
    const supabaseKey: string = `${process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY}`

    return createServerClient(supabaseUrl, supabaseKey, {
        cookies: {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            getAll: () => {console.log("got cookies")},
            setAll: (cookies : string) => {console.log("set cookies", cookies)},
        }
    });
}