import { SumStrategy } from "./SumStrategy";

export class SumPrinter {
  print(strategy: SumStrategy, N: number, outPut: number) {
    const value = strategy.get(N);
    return outPut;
  }
}
