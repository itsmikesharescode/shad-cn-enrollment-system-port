import type { PageServerLoad } from "./$types";

import { admissionCourses } from "../../admission";
import type { CourseDetails } from "$lib/types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({url}) => {

    let courseObject: CourseDetails | undefined;

    admissionCourses.subscribe( state => {

        state.college.map( outerItem => {
            
            outerItem.courses.map( innerItem => {
                url.pathname === innerItem.url ? courseObject = innerItem : null;
            });
        });
    });

    if(url.pathname !== courseObject?.url) throw redirect(302, "/admission/college?invalid-route");
    else return { courseObject }
};