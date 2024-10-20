import { Article } from "./Article";
import { DisplayArticleTemplate } from "./DisplayArticleTemplate";

export class SimpleDisplayArticle extends DisplayArticleTemplate {
  constructor(article: Article) {
    super(article);
  }

  protected override titleHtml(): string {
    return `title: ${this.article.getTitle()}`;
  }

  protected override contentHtml(): string {
    return `content: ${this.article
      .getContent()
      .map((item) => item)
      .join()}`;
  }

  protected override footerHtml(): string {
    return `footer: ${this.article.getFooter()}`;
  }
}
