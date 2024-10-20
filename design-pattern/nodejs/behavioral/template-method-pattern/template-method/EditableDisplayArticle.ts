import { Article } from "./Article";
import { DisplayArticleTemplate } from "./DisplayArticleTemplate";

export class EditableDisplayArticle extends DisplayArticleTemplate {
  constructor(article: Article) {
    super(article);
  }

  protected override titleHtml(): string {
    return `편집모드 title: ${this.article.getTitle()}`;
  }
  protected override contentHtml(): string {
    return `편집모드 content: ${this.article
      .getContent()
      .map((item) => item)
      .join()}`;
  }
  protected override footerHtml(): string {
    return `편집모드 footer: ${this.article.getFooter()}`;
  }
}
