import { InstructorData } from "../../types/types";
import { ServerURL } from "./URIs";


/**
 * API for fetching instructor data.
 * @author Hugo Ekstrand
 */


/**
 * Fetches a list of all instructors
 * @returns the promise list of all instructors
 */
export async function getInstructors(): Promise<[InstructorData]>{
    const res = await fetch(ServerURL + "/instructors");
    return res.json();
}