import { useState, useRef } from "react";
import axios from "axios";

const FlightSearchForm = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    adults: 1,
    travelClass: "ECONOMY",
    currencyCode: "EUR",
  });

  const cache = useRef({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cacheKey = JSON.stringify(formData);

    if (cache.current[cacheKey]) {
      onSearch(cache.current[cacheKey]);
      return;
    }

    try {
      const response = await axios.post(
        "https://localhost:7004/api/flights/search",
        formData
      );
      const flightData = response.data?.data || [];

      cache.current[cacheKey] = flightData;
      onSearch(flightData);
    } catch (error) {
      console.error("Error fetching flights:", error.response?.data || error.message);
      alert("Failed to fetch flights. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flight-search-form">
      <div className="form-row">
        <label>Origin:</label>
        <input type="text" name="origin" value={formData.origin} onChange={handleChange} required />

        <label>Destination:</label>
        <input type="text" name="destination" value={formData.destination} onChange={handleChange} required />
      </div>
      
      <label>Departure Date:</label>
      <input type="date" name="departureDate" value={formData.departureDate} onChange={handleChange} required />

      <label>Return Date (optional):</label>
      <input type="date" name="returnDate" value={formData.returnDate} onChange={handleChange} />

      <div className="form-row">
        <label>Passengers:</label>
        <input type="number" name="adults" value={formData.adults} onChange={handleChange} min="1" />

        <label>Travel Class:</label>
        <select name="travelClass" value={formData.travelClass} onChange={handleChange}>
          <option value="ECONOMY">Economy</option>
          <option value="BUSINESS">Business</option>
          <option value="FIRST">First Class</option>
        </select>

        <label>Currency Code:</label>
        <select name="currencyCode" value={formData.currencyCode} onChange={handleChange}>
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
        </select>
      </div>

      <button type="submit">
        Search Flights
      </button>
    </form>
  );
};

export default FlightSearchForm;
