import {createServerClient} from "@supabase/ssr";
import {cookies} from "next/headers";


export const getSupabaseCookiesUtilsClient = ({request}) => {
    const cookieStore = cookies();

    return createServerClient(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}`,
        `${process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY}`,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({name, value, options}) => {
                            cookieStore.set(name, value, options);
                        });
                    } catch (err) {
                        console.error("Failed to set cookies", err);
                    }
                },
            },
        }
    );
};