import { CalcUniqueDigit } from './CalcUniqueDigit';

describe('UniqueDigit Class', () => {
  test('should correctly calculate the result when n = 123 and k = 2', () => {
    const numString = '123'.repeat(2);
    const uniqueDigit = new CalcUniqueDigit(numString, 2);
    expect(uniqueDigit.getResult()).toBe(3); // (123 repeated twice => "123123", sum of digits => 1+2+3+1+2+3=12, then sum of digits of 12 => 1+2=3)
  });

  test('should correctly calculate the result when n = 987 and k = 1', () => {
    const numString = '987'.repeat(1);
    const uniqueDigit = new CalcUniqueDigit(numString, 1);
    expect(uniqueDigit.getResult()).toBe(6); // (987 => 9+8+7=24, then sum of digits of 24 => 2+4=6)
  });

  test('should handle large numbers of repeated digits correctly (n = 99, k = 100)', () => {
    const numString = '99'.repeat(100);
    const uniqueDigit = new CalcUniqueDigit(numString, 100);
    expect(uniqueDigit.getResult()).toBe(9); // (99 repeated 100 times => sum of digits => 9*100 = 900, then sum of digits of 900 => 9+0+0=9)
  });

  test('should handle n = 1 and k = 10', () => {
    const numString = '1'.repeat(10);
    const uniqueDigit = new CalcUniqueDigit(numString, 10);
    expect(uniqueDigit.getResult()).toBe(1); // (1 repeated 10 times => "1111111111", sum of digits => 1*10=10, then sum of digits of 10 => 1+0=1)
  });

  test('should calculate result correctly for small numbers', () => {
    const numString = '5'.repeat(3);
    const uniqueDigit = new CalcUniqueDigit(numString, 3);
    expect(uniqueDigit.getResult()).toBe(6); // (5 repeated 3 times => "555", sum of digits => 5+5+5=15, then sum of digits of 15 => 1+5=6)
  });

  test('should correctly calculate the result when n = 999 and k = 1', () => {
    const numString = '999'.repeat(1);
    const uniqueDigit = new CalcUniqueDigit(numString, 1);
    expect(uniqueDigit.getResult()).toBe(9); // (999 => 9+9+9=27, then sum of digits of 27 => 2+7=9)
  });

  test('should return the correct result when the sum of digits directly results in a single digit', () => {
    const numString = '111'.repeat(2);
    const uniqueDigit = new CalcUniqueDigit(numString, 2);
    expect(uniqueDigit.getResult()).toBe(6); // (111 repeated twice => "111111", sum of digits => 1+1+1+1+1+1=6, then sum of digits of 6 => 6)
  });

  test('should handle edge case where n = 0 and k = 5', () => {
    const numString = '0'.repeat(5);
    const uniqueDigit = new CalcUniqueDigit(numString, 5);
    expect(uniqueDigit.getResult()).toBe(0); // (0 repeated 5 times => "00000", sum of digits => 0+0+0+0+0=0)
  });
});
