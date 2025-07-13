import { useState } from 'react'

export default function TabNavigation({ tabs, activeTab, onTabChange }) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-600">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab)}
            className={`
              whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200
              ${activeTab?.id === tab.id
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  )
} 