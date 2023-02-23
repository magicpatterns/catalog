import brick from './brick.gif'

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
        Deliver bricks to your door in 5 minutes!
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <img src={brick} alt="bricks" />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <button className="primary-button">Buy now</button>
        <button className="secondary-button">Talk to sales</button>
      </div>
    </>
  )
}

export default App
