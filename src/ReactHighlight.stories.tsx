import { StoryObj } from '@storybook/react'
import ReactHighlight from './ReactHighlight'

const ReactHighlightStories = {
  title: 'Highlight',
  component: ReactHighlight,
}
export default ReactHighlightStories

type Story = StoryObj<typeof ReactHighlight>
export const Component: Story = {
  args: {
    searchTerm: '"Brown Fox"',
    text: 'the Brown Fox jumps over the lazy dog',
    className: '',
    caseSensitive: false,
    inlineStyle: '',
  },
}
