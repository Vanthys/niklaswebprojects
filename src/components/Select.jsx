import { useState } from 'react'
import { Description, Field, Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { IconChevronDown, IconCheck } from '@tabler/icons-react'

export default function Select({
  label = "Select",
  items = [],
  placeholder = "Select an option",
  description,
  disabled = false,
  className = "",
  multiple = false,
  name,
  onChange,
}) {
  const [selected, setSelected] = useState(multiple ? [] : (items[0] || null));

  const displayValue = multiple
    ? (selected.length > 0 ? selected.map(item => item.value).join(', ') : placeholder)
    : (selected ? selected.value : placeholder);

  const handleChange = (newValue) => {
    setSelected(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <Field disabled={disabled} className={`relative ${className}`}>
      <Label className="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">{label}</Label>
      {description && (
        <Description className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</Description>
      )}
      <Listbox
        value={selected}
        onChange={handleChange}
        disabled={disabled}
        multiple={multiple}
        name={name}
      >
        <ListboxButton
          className="relative w-full cursor-default rounded-md bg-white dark:bg-gray-800 py-1.5 pl-3 pr-10 text-left text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <span className="block truncate">{displayValue}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <IconChevronDown aria-hidden="true" className="h-5 w-5 text-gray-400 dark:text-gray-500" />
          </span>
        </ListboxButton>

        <ListboxOptions
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black/5 dark:ring-gray-600 focus:outline-none sm:text-sm"
        >
          {items.length === 0 ? (
            <div className="py-2 px-3 text-gray-500 dark:text-gray-400">No options available</div>
          ) : (
            items.map((item) => (
              <ListboxOption
                key={item.id}
                value={item}
                className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 dark:text-gray-100 data-focus:bg-indigo-600 data-focus:text-white"
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>
                      {item.value}
                    </span>
                    {selected && (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 dark:text-indigo-400 data-focus:text-white">
                        <IconCheck aria-hidden="true" className="h-5 w-5" />
                      </span>
                    )}
                  </>
                )}
              </ListboxOption>
            ))
          )}
        </ListboxOptions>
      </Listbox>
    </Field>
  )
}