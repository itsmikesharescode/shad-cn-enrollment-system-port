import {writable} from "svelte/store";
import type { CourseDetails } from "./types";

export const navState = writable({
    activeItem: "",
    
    defaultNav: [
        {
            title: "Mike Shares Code",
            url: "/",
        }
    ],

    staticNav: [
        {
            title: "Home",
            url: "/"
        },

        {
            title: "Scholarship",
            url: "/scholarship"
        },

        {
            title: "Admission",
            url: "/admission",
        }
    ],

    studentNav: [
        {
            title: "Home",
            url: "/"
        },

        {
            title: "Scholarship",
            url: "/scholarship"
        },

        {
            title: "Admission",
            url: "/admission",
        },

        {
            title: "Interaction",
            url: "/interaction"
        },

        {
            title: "Status",
            url: "/status"
        }
    ],

    adminNav: [
        {
            title: "Home",
            url: "/"
        },

        {
            title: "Scholarship",
            url: "/scholarship"
        },

        {
            title: "Interaction",
            url: "/interaction/admin"
        },

        {
            title: "Request",
            url: "/request"
        }
    ],

    sessionState: null
});

//admission state management
export const admissionState = writable({
    
})