import React from "react";

const FlightResults = ({ results }) => {
  if (!results || results.length === 0) {
    return <p className="text-center text-gray-600 mt-4">No flights found.</p>;
  }

  return (
    <div className="results-container">
      <h2>Flight Results</h2>
      <table className="results-table">
        <thead>
          <tr>
            <th>Origin</th>
            <th>Destination</th>
            <th>Departure Date</th>
            <th>Return Date</th>
            <th>Departure Transfers</th>
            <th>Return Transfers</th>
            <th>Passengers</th>
            <th>Currency</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {results.map((flight, index) => (
            <tr key={index}>
              <td>{flight.itineraries[0].segments[0].departure.iataCode}</td>
              <td>{flight.itineraries[0].segments.slice(-1)[0].arrival.iataCode}</td>
              <td>{flight.itineraries[0].segments[0].departure.at.split("T")[0]}</td>
              <td>
                {flight.itineraries[1]?.segments[0].departure.at.split("T")[0] || "N/A"}
              </td>
              <td>{flight.itineraries[0].segments.length - 1}</td>
              <td>
                {flight.itineraries[1] ? flight.itineraries[1].segments.length - 1 : "N/A"}
              </td>
              <td>{flight.travelerPricings.length}</td>
              <td>{flight.price.currency}</td>
              <td>{flight.price.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlightResults;
