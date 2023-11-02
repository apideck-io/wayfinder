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
  defaultJsonPath: `$['Invoice']['BillAddr']['Country']`,
  onClose: () => {
    console.log('closed')
  },
  open: true,
  isStandAlone: false,
  onSelect: (jsonPath: string) => console.log(jsonPath),
  defaultInput: JSON.stringify(
    {
      Invoice: {
        AllowIPNPayment: false,
        AllowOnlineACHPayment: false,
        AllowOnlineCreditCardPayment: false,
        AllowOnlinePayment: false,
        ApplyTaxAfterDiscount: false,
        Balance: 477.5,
        BillAddr: {
          City: 'Middlefield',
          Country: 'USA',
          CountrySubDivisionCode: 'CA',
          Id: '94',
          Lat: '37.4031672',
          Line1: 'Sasha Tillou',
          Line2: 'Freeman Sporting Goods',
          Line3: '370 Easy St.',
          Line4: 'Middlefield, CA  94482',
          Long: '-122.0642815',
          PostalCode: '94482'
        },
        BillEmail: {
          Address: 'Sporting_goods@intuit.com'
        },
        CurrencyRef: {
          name: 'United States Dollar',
          value: 'USD'
        },
        CustomField: [
          {
            DefinitionId: '1',
            Name: 'Crew #',
            StringValue: '105',
            Type: 'StringType'
          }
        ],
        CustomerMemo: {
          value: 'Thank you for your business and have a great day!'
        },
        CustomerRef: {
          name: '0969 Ocean View Road',
          value: '8'
        },
        DocNumber: '1036',
        DueDate: '2021-03-26',
        EmailStatus: 'NotSet',
        Id: '129',
        Line: [
          {
            Amount: 50,
            Description: 'Sod',
            DetailType: 'SalesItemLineDetail',
            Id: '1',
            LineNum: 1,
            SalesItemLineDetail: {
              ItemRef: {
                name: 'Sod',
                value: '14'
              },
              Qty: 5,
              TaxCodeRef: {
                value: 'TAX'
              },
              UnitPrice: 10
            }
          },
          {
            Amount: 50,
            Description: '2 cubic ft. bag',
            DetailType: 'SalesItemLineDetail',
            Id: '2',
            LineNum: 2,
            SalesItemLineDetail: {
              ItemRef: {
                name: 'Soil',
                value: '15'
              },
              Qty: 5,
              TaxCodeRef: {
                value: 'TAX'
              },
              UnitPrice: 10
            }
          },
          {
            Amount: 15,
            Description: 'Fountain Pump',
            DetailType: 'SalesItemLineDetail',
            Id: '5',
            LineNum: 5,
            SalesItemLineDetail: {
              ItemRef: {
                name: 'Pump',
                value: '11'
              },
              Qty: 1,
              TaxCodeRef: {
                value: 'TAX'
              },
              UnitPrice: 15
            }
          },
          {
            Description: 'Fountain Pump Bonus',
            DetailType: 'DiscountLineDetail',
            DiscountLineDetail: {
              DiscountPercent: 5,
              PercentBased: true,
              TaxCodeRef: {
                value: 'TAX'
              }
            },
            Id: '6',
            LineNum: 6
          },
          {
            Amount: 477.5,
            DetailType: 'SubTotalLineDetail',
            SubTotalLineDetail: {}
          }
        ],
        LinkedTxn: []
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
