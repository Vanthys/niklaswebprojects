import { useState, useEffect } from 'react'
import { IconSun, IconMoon } from '@tabler/icons-react'
import PageHeader from './components/PageHeader'
import Container from './components/Container'
import TabNavigation from './components/TabNavigation'
import SentimentAnalysis from './pages/transformer/SentimentAnalysis'
import TokenizerComparison from './pages/transformer/TokenizerComparison'

function App() { 
  const [darkMode, setDarkMode] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [activeTab, setActiveTab] = useState(null)

  const tabs = [
    { id: '1', label: 'Sentiment Analysis', value: 'sentiment' },
    { id: '2', label: 'Tokenizer Comparison', value: 'tokenizer' }
  ]

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode')
    
    if (savedDarkMode !== null && savedDarkMode !== 'null') {
      try {
        const parsed = JSON.parse(savedDarkMode)
        setDarkMode(parsed)
      } catch (error) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        setDarkMode(prefersDark)
      }
    } else {
      // Check system preference only if no localStorage value
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setDarkMode(prefersDark)
    }
    setIsInitialized(true)
  }, [])

  // Auto-select first tab on component mount
  useEffect(() => {
    if (tabs.length > 0 && !activeTab) {
      setActiveTab(tabs[0])
    }
  }, [tabs, activeTab])

  // Update document class and localStorage when dark mode changes
  useEffect(() => {
    if (isInitialized) {
      if (darkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
      localStorage.setItem('darkMode', JSON.stringify(darkMode))
    }
  }, [darkMode, isInitialized])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const renderActiveTab = () => {
    if (!activeTab) return null;
    
    switch (activeTab.value) {
      case 'sentiment':
        return <SentimentAnalysis />;
      case 'tokenizer':
        return <TokenizerComparison />;
      default:
        return null;
    }
  }
 
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Container className="py-8 md:py-12">
        <div className="flex justify-between items-center mb-8">
          <PageHeader className="flex-1" />
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <IconSun className="w-6 h-6 text-gray-500" />
            ) : (
              <IconMoon className="w-6 h-6 text-gray-500" />
            )}
          </button>
        </div>

        <section className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8 hover:shadow-lg transition-shadow duration-300">
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            Welcome to the playground! Explore and play around with new cutting edge tools.
          </p>
        </section>

        <section className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8 hover:shadow-lg transition-shadow duration-300">
          <TabNavigation 
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          
          {activeTab && (
            <div className="mt-6">
              {renderActiveTab()}
            </div>
          )}
        </section>
      </Container>
    </div>
  )
}

export default App
