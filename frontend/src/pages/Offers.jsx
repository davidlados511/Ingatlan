import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function Offers() {
   const [offers, setOffers] = useState([]);

   useEffect(() => {
    // Fetch offers from the backend API
    fetch('http://localhost:3000/api/ingatlan')
        .then(response => response.json())
        .then(data => setOffers(data))
        .catch(error => console.error('Error fetching offers:', error));
   }, []);

return (
  <div className="container bg-light mt-4">
    <h1 className="text-center mb-2 display-4">Ajánlataink</h1>

    <div className="table-responsive">
      <table className="table custom-table">
        <thead>
          <tr>
            <th scope="col" className="text-center">Kategória</th>
            <th scope="col" className="text-center">Leírás</th>
            <th scope="col" className="text-center">Hirdetés dátuma</th>
            <th scope="col" className="text-center">Tehermentes</th>
            <th scope="col" className="text-center">Fénykép</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((ingatlan) => (
            <tr key={ingatlan.id} className="align-middle">
              <td className="fw-bold text-center">{ingatlan.kategoriak.nev || "Nincs kategória"}</td>
              <td className="description-cell">{ingatlan.leiras}</td>
              <td className="text-center">{ingatlan.hirdetesDatuma}</td>
              <td className="text-center">
                <span className={ingatlan.tehermentes ? "text-success fw-bold" : "text-danger"}>
                  {ingatlan.tehermentes ? "Igen" : "Nem"}
                </span>
              </td>
              <td className="text-end">
                <img 
                  src={ingatlan.kepUrl} 
                  alt="ingatlan" 
                  className="img-fluid"
                  style={{ width: "200px", objectFit: "cover" }}
                />
              </td>    
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
}

export default Offers;