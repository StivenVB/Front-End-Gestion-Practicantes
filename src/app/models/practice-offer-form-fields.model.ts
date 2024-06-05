import { PracticeOfferFormOptionsModel } from "./practice-offer-form-options.model";

export class PracticeOfferFormFieldsModel{
    label: String = '';
    type: String = '';
    name: String = '';
    options?: PracticeOfferFormOptionsModel[];
}
