import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Newad() {

    const [formData, setFormData] = useState({
        kategoria: 0,
        leiras: '',
        kepUrl: '',
        tehermentes: true
    });

    const today = new Date().toISOString().split('T')[0];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:3000/api/ingatlan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...formData,
                hirdetesDatuma: today
            })
        })
        .then(res => res.json())
        .then(data => {
            alert("Sikeres mentés!");
            console.log(data);
        })
        .catch(err => console.error(err));
    };

    return (
    <div className="container mt-5">
        <h2 className="mb-4 text-center">Új hirdetés elküldése</h2>

        <form onSubmit={handleSubmit}>
        <div className="row">
            <div className="offset-lg-3 offset-md-2 col-lg-6 col-md-8 col-12">

                <div className="mb-3">
                    <label className="form-label">Ingatlan kategóriája</label>
                    <select 
                        className="form-select"
                        name="kategoria"
                        value={formData.kategoria}
                        onChange={handleChange}
                        required
                    >
                        <option value="0">Kérem válasszon</option>
                        <option value="1">Ház</option>
                        <option value="2">Lakás</option>
                        <option value="3">Építési telek</option>
                        <option value="4">Garázs</option>
                        <option value="5">Mezőgazdasági terület</option>
                        <option value="6">Ipari ingatlan</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Hirdetés dátuma</label>
                    <input 
                        type="date" 
                        className="form-control" 
                        value={today}
                        disabled
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Ingatlan leírása</label>
                    <textarea 
                        className="form-control"
                        name="leiras"
                        value={formData.leiras}
                        onChange={handleChange}
                        rows="3"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Fénykép az ingatlanról</label>
                    <input 
                        type="url"
                        className="form-control"
                        name="kepUrl"
                        value={formData.kepUrl}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-check mb-3">
                    <input 
                        className="form-check-input"
                        type="checkbox"
                        name="tehermentes"
                        checked={formData.tehermentes}
                        onChange={handleChange}
                    />
                    <label className="form-check-label">
                        Tehermentes ingatlan
                    </label>
                </div>

                <div className="mb-3 text-center">
                    <button type="submit" className="btn btn-primary px-5">
                        Küldés
                    </button>
                </div>

            </div>
        </div>
        </form>
    </div>
    );
}

export default Newad;