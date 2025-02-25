import { useState } from "react";
import FlightSearchForm from "./components/FlightSearchForm";
import FlightResults from "./components/FlightResults";

function App() {
  const [flights, setFlights] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (searchResults) => {
    setFlights(searchResults);
    setShowResults(true);
  };

  return (
    <div>
      <h1 className="header">✈️ Flight Search</h1>
      <div className="container">
        <FlightSearchForm onSearch={handleSearch} />
      </div>
      <div>
        {showResults && <FlightResults results={flights} />}
      </div>
    </div>
  );
}

export default App;