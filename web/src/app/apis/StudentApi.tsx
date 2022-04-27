import { StudentData } from "../../types/types";
import { ServerURL } from "./URIs";

/**
 * @author Hugo Ekstrand
 * API for fetching student data.
 */


/**
 * Fetches a list of all students
 * @returns the promise list of all students
 */
export async function getStudents(): Promise<[StudentData]>{
    const res = await fetch(ServerURL + "/students");
    return res.json();
}