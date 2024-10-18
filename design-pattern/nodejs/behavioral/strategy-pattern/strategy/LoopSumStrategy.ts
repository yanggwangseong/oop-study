import { SumStrategy } from "./SumStrategy";

export class LoopSumStrategy implements SumStrategy {
  get(N: number): number {
    let sum = 0;
    for (let i = 1; i <= N; i++) sum += i;
    return sum;
  }
}
