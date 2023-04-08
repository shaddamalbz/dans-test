import { FC, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import clsx from 'clsx'

interface Dropdown {
  triggerButton: JSX.Element
  children: JSX.Element | string
  className?: string
}

const Dropdown: FC<Dropdown> = (props) => {
  const { children, triggerButton, className } = props
  return (
    <Menu as="div" className={clsx('relative inline-block text-left', className)}>
      <Menu.Button className="cursor-pointer" as="div">
        {triggerButton}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-72 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {children}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default Dropdown
