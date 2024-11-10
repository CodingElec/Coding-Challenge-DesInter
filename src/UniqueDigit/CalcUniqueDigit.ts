export class CalcUniqueDigit {
     
    result: number
    n: number;
    k: number;

   constructor(n:number, k: number) {
    this.n=n;
    this.k=k
    this.result = this.calculateNewUniqueDigit(n,k)
   }      

   public getResult() {
        return this.result;
    }
   
    
    private calculateNewUniqueDigit (n:number, k: number):number {
        const numString = n.toString().repeat(k)

        let uniqueDigit = this.sumOfDigits(numString);

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