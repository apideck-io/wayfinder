import { HTMLAttributes, ReactNode, forwardRef } from 'react';

import classNames from 'classnames';

export interface Props extends HTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'danger-outline';
  size?: 'small' | 'regular' | 'large' | 'larger';
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  text?: string;
}

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  {
    children,
    type = 'button',
    disabled = false,
    variant = 'primary',
    size = 'regular',
    className = '',
    isLoading = false,
    text,
    ...other
  },
  ref
) {
  const baseStyles =
    'inline-flex items-center justify-center border border-transparent leading-4 font-medium rounded transition duration-300 ease-in-out whitespace-nowrap';

  const variantStyles = {
    primary:
      'bg-primary-600 text-white shadow hover:shadow-md active:bg-primary-600 hover:bg-primary-700 focus:shadow-outline-primary dark:hover:bg-primary-500',
    secondary:
      'border-primary-200 text-primary-700 bg-primary-50 hover:bg-primary-100 shadow hover:shadow-md focus:shadow-outline-primary dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:border-transparent',
    outline:
      'border-gray-300 text-gray-600 shadow hover:shadow-md hover:text-gray-700 dark:border-gray-700/50 dark:text-white dark:hover:text-gray-400',
    danger:
      'bg-red-500 text-white shadow hover:shadow-md active:bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 focus:shadow-outline-red dark:hover:text-red-200 dark:border-transparent',
    'danger-outline':
      'border-red-200 text-red-600 shadow hover:shadow-md active:border-red-300 hover:border-red-400 focus:shadow-outline-red dark:border-red-400 dark:text-red-400 dark:hover:text-red-300 dark:hover:border-red-300',
  };

  const sizeStyles = {
    small: 'px-2.5 py-1.5 text-xs',
    regular: 'px-4 py-2 text-sm',
    large: 'px-5 py-3 text-base',
    larger: 'px-6 py-4 text-md',
  };

  const iconSizeStyles = {
    small: 'h-3 w-3',
    regular: 'h-4 w-4',
    large: 'h-4 w-4',
    larger: 'h-5 w-5',
  };

  const iconStyles = {
    primary: 'text-white ',
    secondary: 'text-primary-700',
    outline: 'text-gray-600 hover:text-gray-700',
    danger: 'text-white ',
    'danger-outline': 'text-red-600 hover:border-red-400',
  };

  return (
    <button
      className={classNames(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        { 'opacity-50': disabled },
        { 'cursor-not-allowed': disabled || isLoading },
        className
      )}
      type={type}
      disabled={disabled}
      ref={ref}
      {...other}
    >
      {isLoading && (
        <svg
          data-testid='loading-svg'
          className={classNames(
            iconSizeStyles[size],
            iconStyles[variant],
            'animate-spin -ml-1 mr-3'
          )}
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
        >
          <circle
            className='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='4'
          ></circle>
          <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
          ></path>
        </svg>
      )}
      {text || children}
    </button>
  );
});
