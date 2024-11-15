export class CalcUniqueDigit {
     
    result: number
    numSequence: string;
    k: number;

   constructor(numSequence:string, k: number) {
    this.numSequence=numSequence;
    this.k=k
    this.result = this.calculateNewUniqueDigit(numSequence)
   }      

   public getResult() {
        return this.result;
    }
   
    
    private calculateNewUniqueDigit (numSequence: string):number {
        

        let uniqueDigit = this.sumOfDigits(numSequence);

        while(uniqueDigit >9) {
            
            uniqueDigit = this.sumOfDigits(uniqueDigit.toString())
        }

        return uniqueDigit;
     }

     private sumOfDigits (numString: string): number {
        let sum = 0;
        for(let digit of numString.split('')) {
            sum += parseInt(digit,10);
        }
        return sum;
     }
}