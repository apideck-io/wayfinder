import { useCallback, useEffect, useState } from 'react'
import { Modal } from './Modal'
import { WayFinder } from './WayFinder'

export interface Props {
  open: boolean
  isStandAlone: boolean
  onClose?: () => void
  defaultInput?: string
}

export const WayFinderModal: React.FC<Props> = ({
  open,
  onClose,
  isStandAlone = true,
  defaultInput = '{}'
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
          <WayFinder defaultInput={defaultInput} isStandAlone={isStandAlone} />
        </Modal>
      ) : null}
    </div>
  )
}
