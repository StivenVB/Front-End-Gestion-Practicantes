import { PracticeOfferFormModel } from "./practice-offer-form.model";

export class PracticeOfferModel{
    id?: number;
    faculty?: String;
    description?: String;
    year?: number;
    semester?: number;
    starDate?: Date;
    endDate?: Date;
    isActive?: boolean;
    formSchema: PracticeOfferFormModel = new PracticeOfferFormModel;
}
