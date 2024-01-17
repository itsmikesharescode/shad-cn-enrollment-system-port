import {z} from "zod";

export const applicationSchema = z.object({
    course: z.string().min(1, {message: "Course is required."}),
    presentAddress: z.string().min(1, {message: "Present address is required."}).max(100, {message: "Present address must be less than 100 characters long."}),
    religion: z.string().min(1, {message: "Religion is required."}).max(50, {message: "Religion must be less than 50 characters long."}),
    dateOfBirth: z.string().min(1, {message: "Date of birth is required."}).max(50, {message: "Date of birth must be less than 50 characters long."}),
    fName: z.string().min(1, {message: "Father's fullname is required."}).max(100, {message: "Father's fullname must be less than 100 characters long."}),
    mName: z.string().min(1, {message: "Mother's fullname is required."}).max(100, {message: "Mother's fullname must be less than 100 characters long."}),
    primarySchoolName: z.string().min(1, {message: "Primary school name is required."}).max(100, {message: "Primary school name must be less than 100 characters long."}), 
    primarySchoolAddress: z.string().min(1, {message: "Primary school address is required."}).max(100, {message: "Primary school address must be less than 100 characters long."}),
    primaryGraduation: z.string().min(1, {message: "Primary school year graduated is required."}).max(50, {message: "Primary school year graduated must be less than 50 characters long."}),
    secondarySchoolName: z.string().min(1, {message: "Secondary school name is required."}).max(100, {message: "Secondary school name must be less than 100 characters long."}),
    secondarySchoolAddress: z.string().min(1, {message: "Secondary school address is required."}).max(100, {message: "Secondary school address must be less than 100 characters long."}),
    secondaryGraduation: z.string().min(1, {message: "Secondary school year graduated is required."}).max(50, {message: "Secondary school year graduated must be less than 50 characters long."}),
})