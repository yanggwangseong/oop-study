import { GaussSumStrategy } from "./GaussSumStrategy";
import { LoopSumStrategy } from "./LoopSumStrategy";
import { SumPrinter } from "./SumPrinter";

const printer = new SumPrinter();

console.log(printer.print(new LoopSumStrategy(), 100)); // 출력 결과 5050
console.log(printer.print(new GaussSumStrategy(), 100)); // 출력 결과 5050
