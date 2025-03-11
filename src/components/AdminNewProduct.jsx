import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AdminNewProduct = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [formData, setFormData] = useState({
    namn: '',
    beskrivning: '',
    bild: '',
    marke: '',
    sku: '',
    pris: '',
    publiceringsdatum: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.namn) {
      newErrors.namn = 'Namn är obligatoriskt';
    } else if (formData.namn.length > 25) {
      newErrors.namn = 'Namn får vara högst 25 tecken';
    }

    if (!formData.bild) {
      newErrors.bild = 'Bild är obligatoriskt';
    }

    const skuRegex = /^[A-Z]{3}[0-9]{3}$/;
    if (!formData.sku) {
      newErrors.sku = 'SKU är obligatoriskt';
    } else if (!skuRegex.test(formData.sku)) {
      newErrors.sku = 'SKU måste vara i formatet XXXYYY där X är bokstäver och Y är siffror';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      fetch('http://localhost:8000/api/furniture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
        .then(response => response.json())
        .then(data => {
          console.log('Form submitted:', data);
          // Navigate to the admin page
          navigate('/admin/products'); // try without admin
        })
        .catch(error => console.error('Error submitting form:', error));
    }
  };

  return (
    <div className="admin-page">
      {/* Main Area */}
      <div className="w-3/4 p-4">
        <h2 className="text-xl mb-4">Ny Produkt</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="namn">
              Namn
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="namn"
              type="text"
              placeholder="Namn"
              value={formData.namn}
              onChange={handleChange}
            />
            {errors.namn && <p className="text-red-500 text-xs italic">{errors.namn}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="beskrivning">
              Beskrivning
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="beskrivning"
              placeholder="Beskrivning"
              value={formData.beskrivning}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bild">
              Bild
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="bild"
              type="text"
              placeholder="Bild URL"
              value={formData.bild}
              onChange={handleChange}
            />
            {errors.bild && <p className="text-red-500 text-xs italic">{errors.bild}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="marke">
              Märke
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="marke"
              type="text"
              placeholder="Märke"
              value={formData.marke}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sku">
              SKU
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="sku"
              type="text"
              placeholder="XXXYYY"
              value={formData.sku}
              onChange={handleChange}
            />
            {errors.sku && <p className="text-red-500 text-xs italic">{errors.sku}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pris">
              Pris
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="pris"
              type="text"
              placeholder="Pris"
              value={formData.pris}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="publiceringsdatum">
              Publiceringsdatum
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="publiceringsdatum"
              type="date"
              value={formData.publiceringsdatum}
              onChange={handleChange}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Lägg till
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminNewProduct;