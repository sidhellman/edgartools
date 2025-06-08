export function fixMarkdown(md: string): string {
  md = md.replace(/([a-z]\.)([A-Z])/g, '$1 $2');
  md = md.replace(/\*\*(Item)\*\*\xa0\*\*(\d)/gi, '$1 $2');
  md = md.replace(/(Item)[\n\xa0]\s?(\d)/gi, '$1 $2');
  md = md.replace(/\. (Item)\s?(\d.\d{,2})/gi, '.\n $1 $2');
  md = md.replace(/(\S)(Item)\s?(\d.\d{,2})/gi, '$1\n\n $2 $3');
  return md;
}

export function htmlToMarkdown(html: string): string {
  const text = html.replace(/<[^>]+>/g, '');
  return fixMarkdown(text);
}

export class MarkdownContent {
  md: string;
  title: string;

  constructor(html: string, title = '') {
    this.md = htmlToMarkdown(html);
    this.title = title;
  }

  toString(): string {
    return this.md;
  }
}
