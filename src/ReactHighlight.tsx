import Highlight, { HighlightConfig } from './Highlight';

type ReactHighlightProps = HighlightConfig & {
  searchTerm: string;
  text: string;
};
export default function ReactHighlight({
  searchTerm,
  text,
  caseSensitive,
  className,
  inlineStyle,
}: ReactHighlightProps) {
  const highlight = new Highlight({ caseSensitive, className, inlineStyle });
  const htmlString = highlight.term(searchTerm).in(text).html.innerHTML;
  return <span dangerouslySetInnerHTML={{ __html: htmlString }}></span>;
}
