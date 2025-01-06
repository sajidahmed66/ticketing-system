import {createServerClient, serializeCookieHeader} from "@supabase/ssr";
import {NextResponse} from "next/server";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const getSupabaseReqResClient = ({request, response: responseInput}) => {

    let response = {
        value: responseInput ?? NextResponse.next({request: request})
    };

    const supabase = createServerClient(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}`,
        `${process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY}`,
        {
            cookies: {
                getAll() {
                    if ("getAll" in request.cookies) {
                        return request.cookies.getAll();
                    } else {
                        return Object.keys(request.cookies).map((name) => ({
                            name,
                            value: request.cookies[name]
                        }))
                    }
                },
                setAll(cookiesToSet) {
                    if ("getAll" in request.cookies) {
                        cookiesToSet.forEach(({name, value, options}) => {
                            request.cookies.set(name, value);
                        });
                        response.value = NextResponse.next({
                            request,
                        });
                        cookiesToSet.forEach(({name, value, options}) => {
                            response.value.cookies.set(name, value, options);
                        });
                    } else {
                        //page router /not middleware
                        responseInput.setHeader(
                            "Set-Cookie",
                            cookiesToSet.map(({name, value, options}) =>
                                serializeCookieHeader(name, value, options)
                            )
                        )
                    }
                },
            },
        }
    );

    return {supabase, response}
}