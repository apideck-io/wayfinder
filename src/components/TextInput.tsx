import React, { Fragment, ReactNode, createRef, forwardRef, useEffect, useState } from 'react'

import classNames from 'classnames'
import { useClipboard } from 'use-clipboard-copy'

const styles = {
  dark: 'dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-gray-700 dark:focus:ring-gray-700',
  valid: 'border-green-600 focus:border-green-400 focus:shadow-outline-green',
  invalid: 'border-red-600 focus:border-red-400 focus:shadow-outline-red'
}

export interface Props extends React.HTMLAttributes<HTMLInputElement> {
  name: string
  type?: string
  value?: string
  required?: boolean
  disabled?: boolean
  className?: string
  valid?: boolean
  autoComplete?: string
  autoFocus?: boolean
  readOnly?: boolean
  sensitive?: boolean
  canBeCopied?: boolean
  searchable?: boolean
  onCloseIconClick?: () => void
  searchIconClassName?: string
  closeIconClassName?: string
  copyIconClassName?: string
  prepend?: string | JSX.Element | ReactNode
  append?: string | JSX.Element | ReactNode
  min?: string | number | undefined
  max?: string | number | undefined
  step?: string | number | undefined
}

export const TextInput = forwardRef<HTMLInputElement, Props>(function TextInput(
  {
    type = 'text',
    sensitive = false,
    canBeCopied = false,
    searchable = false,
    onCloseIconClick,
    searchIconClassName = '',
    closeIconClassName = '',
    copyIconClassName = '',
    prepend,
    append,
    ...props
  },
  ref
) {
  const [show, setShow] = useState(false)
  const clipboard = useClipboard({ copiedTimeout: 2000 })
  const inputRef = createRef<HTMLInputElement>()

  useEffect(() => {
    if (show) {
      inputRef.current?.select()
    }
  }, [inputRef, show])

  if (sensitive || canBeCopied || searchable) {
    const inputType = sensitive ? 'password' : type

    return (
      <div className={classNames('relative', props.className)}>
        {searchable && (
          <Fragment>
            <div
              className={classNames(
                'absolute left-0 flex items-center pt-[9px] pl-2 pointer-events-none',
                searchIconClassName
              )}
            >
              <svg
                className="w-5 h-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {onCloseIconClick && (
              <div
                className={classNames(
                  'absolute right-0 flex items-center pt-[9px] pr-2',
                  closeIconClassName
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  onClick={onCloseIconClick}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            )}
          </Fragment>
        )}
        <Input
          {...props}
          type={show ? 'text' : inputType}
          ref={inputRef}
          className={classNames(props.className, { 'pl-8': searchable })}
        />
        {canBeCopied && (
          <button
            onClick={() => {
              clipboard.copy(inputRef.current?.value as string)
            }}
            type="button"
            className={`absolute right-0 bg-white dark:bg-gray-800 top-[5px] p-1 mr-2 flex items-center justify-center text-gray-400 hover:text-gray-500 dark:text-white transition-all duration-200 rounded-md hover:bg-gray-100 focus:outline-none ${copyIconClassName}`}
            data-testid="copy-button"
          >
            {clipboard.copied ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
              </svg>
            )}
          </button>
        )}
        {sensitive && (
          <button
            onClick={() => {
              setShow(!show)
            }}
            type="button"
            className={classNames(
              'absolute right-0 bg-white dark:bg-gray-800 top-[5px] p-1 mr-3 flex items-center justify-center text-gray-400 hover:text-gray-500 dark:text-white transition-all duration-200 rounded-md hover:bg-gray-100 focus:outline-none',
              canBeCopied ? 'mr-[35px]' : 'mr-[11px]'
            )}
            data-testid="show-button"
          >
            {show ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                  clipRule="evenodd"
                />
                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        )}
      </div>
    )
  }

  if (prepend || append) {
    return (
      <div className={classNames('relative flex rounded-md shadow-sm', props.className)}>
        {prepend && (
          <span
            className={classNames(
              'inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm',
              styles.dark
            )}
          >
            {prepend}
          </span>
        )}
        <Input
          {...props}
          type={type}
          ref={ref}
          className={classNames('rounded-none', {
            'rounded-r-md': prepend && !append,
            'rounded-l-md': append && !prepend
          })}
        />
        {append && (
          <span
            className={classNames(
              'inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm',
              styles.dark
            )}
          >
            {append}
          </span>
        )}
      </div>
    )
  }

  return <Input {...props} type={type} ref={ref} />
})

export const Input = forwardRef<HTMLInputElement, Props>(function TextInput(
  { className = '', type = 'text', disabled = false, valid, ...other },
  ref
) {
  return (
    <input
      className={classNames(
        'w-full text-gray-600 border-gray-300 rounded-md sm:text-sm shadow-sm focus:ring-primary-400 focus:border-primary-400 placeholder-gray-400',
        styles.dark,
        { 'cursor-not-allowed opacity-60 text-gray-500': disabled },
        {
          [styles.valid]: valid !== undefined && valid
        },
        {
          [styles.invalid]: valid !== undefined && !valid
        },
        className
      )}
      ref={ref}
      disabled={disabled}
      id={other.name}
      type={type}
      {...other}
    />
  )
})

export default TextInput
