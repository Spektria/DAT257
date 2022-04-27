import { StudentData } from "../../types/types";
import { ServerURL } from "./URIs";


export async function getStudents(): Promise<[StudentData]>{
    const res = await fetch(ServerURL + "/students");
    return res.json();
}