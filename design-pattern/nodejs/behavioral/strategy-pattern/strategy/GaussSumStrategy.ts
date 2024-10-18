import { SumStrategy } from "./SumStrategy";

export class GaussSumStrategy implements SumStrategy {
  get(N: number): number {
    return (N * (N + 1)) / 2; // 가우스 공식
  }
}
