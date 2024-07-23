import { remark } from 'remark'
import html from 'remark-html'

export async function getMarkdown(content: string) {
  // convert markdown to html
  const processedContent = await remark().use(html).process(content)

  // return id, content, and data
  return processedContent.toString()
}
