import WeatherDashboard from "./components/WeatherDashboard"

function App() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <header className="bg-blue-800 p-4 text-white text-center shadow">
        <h1 className="text-2xl font-bold">Weather Dashboard</h1>
      </header>
      <main className="p-4">
        <WeatherDashboard />
      </main>
    </div>
  )
}

export default App
