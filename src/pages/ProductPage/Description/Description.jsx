import { unescape } from 'lodash'
import HtmlToReact from 'html-to-react'

const Description = ({ desc }) => {
  if (desc) {
    const unescapeddesc = unescape(desc)
    const HtmlToReactParser = HtmlToReact.Parser
    const htmlToReactParser = new HtmlToReactParser()
    const firstDescElement = htmlToReactParser.parse(desc)
    return <div>{firstDescElement}</div>
  } else {
    return null
  }
}

export default Description
