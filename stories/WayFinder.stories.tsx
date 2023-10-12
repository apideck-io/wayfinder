import '../src/styles/index.css'

import { Meta, StoryFn } from '@storybook/react'
import { Props, WayFinder } from '../src/components/WayFinder'

const meta: Meta = {
  title: 'WayFinder',
  component: WayFinder,
  argTypes: {
    children: {
      control: {
        type: 'text'
      }
    }
  },
  parameters: {
    controls: { expanded: true }
  }
}

export default meta

const Template: StoryFn<Props> = (args) => <WayFinder {...args} />
export const Trigger = Template.bind({})

Trigger.args = {
  onClose: () => {
    console.log('closed')
  },
  open: true,
  defaultInput: JSON.stringify(
    {
      id: 'file',
      value: 'File',
      popup: {
        menuitem: [
          { id: 1, name: 'New' },
          { id: 2, name: 'Open' },
          { id: 3, name: 'Close' }
        ]
      }
    },
    null,
    2
  )
}
