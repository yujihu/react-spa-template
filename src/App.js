import React from 'react'
import ErrorBoundary from '_c/error-boundary'
import Home from '_v/home'

function App () {
  return (
    <ErrorBoundary>
      <Home />
    </ErrorBoundary>
  )
}

export default App
