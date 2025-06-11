import Calculator from "./pages/calculator"

const App = () => {
  return (
    <div className="w-screen h-screen bg-neutral-950 flex items-center justify-center text-neutral-100">
      <div className="w-96 bg-neutral-800 p-4 rounded-lg">
        {/* // Your component go here */}
        <Calculator />
      </div>
    </div>
  )
}

export default App
