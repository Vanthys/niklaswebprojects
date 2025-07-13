import {
  IconBriefcase,
  IconCalendar,
  IconCheck,
  IconChevronDown,
  IconCurrencyDollar,
  IconLink,
  IconMapPin,
  IconPencil,
} from '@tabler/icons-react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import dayjs from 'dayjs';

export default function PageHeader() {
  return (
    <div className="lg:flex lg:items-center lg:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold
    bg-gradient-to-r from-blue-500 from-0% via-indigo-500 via-30% to-purple-500 to-100%
    bg-clip-text text-transparent
    sm:text-3xl sm:tracking-tight
    mb-4
    leading-normal
    inline-block">
          Niklas' Project Page
        </h2>
        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
          <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
            <IconBriefcase aria-hidden="true" className="mr-1.5 size-5 shrink-0 text-gray-400 dark:text-gray-500" />
            Embracing the Unknown
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
            <IconMapPin aria-hidden="true" className="mr-1.5 size-5 shrink-0 text-gray-400 dark:text-gray-500" />
            Europe
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
            <IconCalendar aria-hidden="true" className="mr-1.5 size-5 shrink-0 text-gray-400 dark:text-gray-500" />
            Last update {import.meta.env.VITE_BUILD_TIME}
          </div>
        </div>
      </div>
      <div className="mt-5 flex lg:mt-0 lg:ml-4">
        <span className="hidden sm:block">
        {/*   <button 
            type="button"
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
          >
            <IconPencil aria-hidden="true" className="mr-1.5 -ml-0.5 size-5 text-gray-400" />
            Edit
          </button> */}
        </span>


        {/* Dropdown */}
        <Menu as="div" className="relative ml-3 sm:hidden">
          <MenuButton className="inline-flex items-center rounded-md bg-white dark:bg-gray-800 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100 shadow-xs ring-1 ring-gray-300 dark:ring-gray-600 ring-inset hover:ring-gray-400 dark:hover:ring-gray-500">
            More
            <IconChevronDown aria-hidden="true" className="-mr-1 ml-1.5 size-5 text-gray-400 dark:text-gray-500" />
          </MenuButton>

          <MenuItems
            transition
            className="absolute left-0 z-10 mt-2 -mr-1 w-24 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black/5 dark:ring-gray-600 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
          >
            <MenuItem>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 data-focus:bg-gray-100 dark:data-focus:bg-gray-700 data-focus:outline-hidden"
              >
                Edit
              </a>
            </MenuItem>
            <MenuItem>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 data-focus:bg-gray-100 dark:data-focus:bg-gray-700 data-focus:outline-hidden"
              >
                View
              </a>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
  )
}
