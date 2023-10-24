import { Dialog, Transition } from '@headlessui/react';
import React, {
  CSSProperties,
  Fragment,
  ReactNode,
  useEffect,
  useState,
} from 'react';

import classNames from 'classnames';
import { createPortal } from 'react-dom';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  onClose: () => void;
  isOpen: boolean;
  className?: string;
  style?: CSSProperties;
}

export const Modal: React.FC<Props> = ({
  children,
  onClose,
  isOpen = false,
  className = '',
  style = {},
}: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const modalComponent = (
    <Transition.Root appear show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        onClose={onClose}
        style={style}
        className='apideck react-wayfinder'
      >
        <div
          data-testid='backdrop'
          id='react-wayfinder'
          className={classNames(
            'fixed inset-0 z-40 group overflow-y-auto bg-gray-400 bg-opacity-75',
            className
          )}
        >
          <div className='min-h-screen px-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className='inline-block h-screen align-middle'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <div
                className='inline-block w-full text-left max-w-5xl my-12 lg:my-16 align-middle transition-all transform bg-white shadow-xl rounded-lg'
                id='react-wayfinder-modal'
              >
                {children}
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );

  return mounted ? createPortal(modalComponent, document.body) : null;
};
