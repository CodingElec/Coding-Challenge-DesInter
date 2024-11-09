import { UUID } from "crypto";
import { UniqueDigit } from "src/Domain/UniqueDigit";


export class User {
    
    private id: UUID;
    private name: string;
    private email: string;
    
    private uniqueDigits: Array<UniqueDigit>

}