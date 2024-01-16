

export type CourseDetails = {
    title: string;
    img: string;
    url: string;
    intro: string;
    curriculum: string;
    coreCompetenies: string;
    specialization: string;
    opportunities: string;
    experience: string;
}

export type ServerNews<T> = {
    status: number
    type: string
    data: T
}