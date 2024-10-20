import { Article } from "./Article";
import { EditableDisplayArticle } from "./EditableDisplayArticle";
import { SimpleDisplayArticle } from "./SimpleDisplayArticle";

const article = new Article(
  "제목",
  ["내용1", "내용2", "내용3", "내용4"],
  "바닥글"
);

const display = new SimpleDisplayArticle(article);
console.log(display.displayHtml());

// 편집
const editDisplay = new EditableDisplayArticle(article);
console.log(editDisplay.displayHtml());
