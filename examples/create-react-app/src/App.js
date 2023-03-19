import './App.css'
import './.mirrorful/theme.css'

function App() {
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '50px',
          fontSize: '60px',
        }}
      >
        Acme Corp, Inc.
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <button className="primary-button">Buy now</button>
        <button className="secondary-button">Talk to sales</button>
      </div>
    </>
  )
}

export default App
