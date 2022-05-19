import { Student, StudentEducationalMomentData} from "../../types/types";
import { ServerURL } from "./URIs";

/**
 * @author Hugo Ekstrand
 * API for fetching student data.
 */


/**
 * Fetches a list of all students
 * @returns the promise list of all students
 */
export async function getStudents(): Promise<Student[]>{
    const res = await fetch(ServerURL + "/students");
    return res.json();
}

export async function getStudentMoments(id: string): Promise<StudentEducationalMomentData[]>{
    const res = await fetch(`${ServerURL}/students/${id}/moments`);
    return res.json();
}
