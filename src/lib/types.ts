

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
    status: number;
    type: string;
    data: T;
}

//application tb types
export type ApplicationTB = {
    id: number;
    created_at: string;
    application_type: string;
    course: string;
    present_address: string;
    religion: string;
    date_of_birth: string;
    fathers_name: string;
    mothers_name: string;
    primary_school_name: string;
    primary_school_address: string;
    primary_graduation_date: string;
    secondary_school_name: string;
    secondary_school_address: string;
    secondary_graduation_date: string;
    accepted: boolean;
}