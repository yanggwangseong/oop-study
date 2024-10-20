import { Article } from "./Article";

export abstract class DisplayArticleTemplate {
  constructor(protected article: Article) {}

  // 일반 메서드로 정의
  public readonly displayHtml = () => {
    return `
        ${this.titleHtml()}
        ${this.contentHtml()}
        ${this.footerHtml()}
    `;
  };

  protected abstract titleHtml(): string;
  protected abstract contentHtml(): string;
  protected abstract footerHtml(): string;
}
