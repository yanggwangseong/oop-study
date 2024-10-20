import { SumStrategy } from "./SumStrategy";

export class SumPrinter {
  print(strategy: SumStrategy, N: number) {
    return strategy.get(N);
  }
}
