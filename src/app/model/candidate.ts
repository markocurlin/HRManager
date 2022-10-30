import { Interview } from "./interview";

export class Candidate {
    id: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    dateOfApplication: string | undefined;
    workingPlace: string | undefined;
    dateOfBirth: string | undefined;
    profession: string | undefined;
    employment: string | undefined;
    educationDegree: string | undefined;
    education: string | undefined;
    candidateFile: string | undefined;
    interviews: Interview[] = [];
}