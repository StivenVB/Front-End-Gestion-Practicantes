import { PracticeOfferFormModel } from "./practice-offer-form.model";

export class PracticeOfferModel{
    id?: number;
    faculty?: String;
    description?: String;
    year?: number;
    semester?: number;
    startDate?: Date;
    endDate?: Date;
    isActive?: boolean;
    career?: String;
    formSchema: PracticeOfferFormModel = new PracticeOfferFormModel;
}
