import { FC, useCallback, useEffect, useState } from 'react'
import { Modal } from './Modal'
import { WayFinder } from './WayFinder'

export interface Props {
  open: boolean
  isStandAlone: boolean
  onClose?: () => void
  defaultInput?: string
  defaultJsonPath?: string
  onSelect?: (jsonPath: string) => void
}

export const WayFinderModal: FC<Props> = ({
  open,
  onClose,
  isStandAlone = true,
  defaultInput = '{}',
  defaultJsonPath = '',
  onSelect
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true)

  const onCloseModal = useCallback(() => {
    if (isOpen) {
      setIsOpen(false)
      if (onClose) onClose()
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (open && !isOpen) {
      setIsOpen(open)
      return
    }
    if (!open && isOpen) {
      onCloseModal()
    }
  }, [open, isOpen, onCloseModal])

  const shouldRenderModal = isOpen

  return (
    <div id="react-wayfinder">
      {shouldRenderModal ? (
        <Modal
          isOpen={isOpen}
          onClose={() => {
            onCloseModal()
          }}
        >
          <WayFinder
            defaultJsonPath={defaultJsonPath}
            defaultInput={defaultInput}
            isStandAlone={isStandAlone}
            onClose={onCloseModal}
            onSelect={(jsonPath) => {
              onSelect && onSelect(jsonPath)
              setIsOpen(false)
            }}
          />
        </Modal>
      ) : null}
    </div>
  )
}
