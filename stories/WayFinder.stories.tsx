import '../src/styles/index.css'

import { Meta, StoryFn } from '@storybook/react'
import { Props, WayFinderModal } from '../src/components/WayFinderModal'

import React from 'react'

const meta: Meta = {
  title: 'WayFinder',
  component: WayFinderModal,
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

const Template: StoryFn<Props> = (args) => <WayFinderModal {...args} />

export const Modal: any = Template.bind({})

Modal.args = {
  onClose: () => {
    console.log('closed')
  },
  open: true,
  isStandAlone: false,
  onSelect: (jsonPath: string) => console.log(jsonPath),
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

export const ModalEditing: any = Template.bind({})

ModalEditing.args = {
  defaultJsonPath: '$.popup.menuitem[*].name',
  onClose: () => {
    console.log('closed')
  },
  open: true,
  isStandAlone: false,
  onSelect: (jsonPath: string) => console.log(jsonPath),
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

export const Standalone: any = Template.bind({})

Standalone.args = {
  onClose: () => {
    console.log('closed')
  },
  open: true,
  isStandAlone: true,
  onSelect: (jsonPath: string) => console.log(jsonPath),
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
