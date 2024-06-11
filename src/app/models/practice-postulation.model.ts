import { UrlRepositoryModel } from "./url-repository.model";

export class PracticePostulationModel{
    id?: number;
    status?: String;
    userId?: number;
    practiceOfferId?: number;
    createdAt?: Date;
    formData: any;
    urls: UrlRepositoryModel[] = [];
    userfirstname?: String;
    userlastname?: String;
    useremail?: String;
    offerfaculty?: String;
    offerdescription?: String;
    offeryear?: number;
    offersemester?: number;
}
