import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    message: ''
  });

  const [submissions, setSubmissions] = useState([]);

  // Fetch data from Laravel API
  const fetchContacts = async () => {

    try {

      const response = await axios.get(
        "https://api.awintoursandtravels.com/api/contacts"
      );

      console.log(response.data);

      // Laravel returns data inside data.data
      setSubmissions(response.data.data);

    } catch (error) {

      console.log(error);

    }

  };

  // Load contacts on page load
  useEffect(() => {

    fetchContacts();

  }, []);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

  };

  // Submit form to Laravel backend
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "https://api.awintoursandtravels.com/api/contact",
        formData
      );

      console.log(response.data);

      alert("Form submitted successfully!");

      // Refresh data from database
      fetchContacts();

      // Reset form
      setFormData({
        name: '',
        email: '',
        number: '',
        message: ''
      });

    } catch (error) {

      console.log(error);

      alert("Something went wrong!");

    }

  };

  return (

    <div className="App">

      <div className="container">

        <h1>Contact Form</h1>

        <form onSubmit={handleSubmit} className="form">

          <div className="form-group">
            <label htmlFor="name">Name</label>

            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>

            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="number">Phone Number</label>

            <input
              type="tel"
              id="number"
              name="number"
              value={formData.number}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>

            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
            />
          </div>

          <button type="submit" className="submit-btn">
            Submit
          </button>

        </form>

        {/* Data from Laravel Database */}

        {submissions.length > 0 && (

          <div className="table-container">

            <h2>Submitted Data</h2>

            <table className="data-table">

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Message</th>
                </tr>
              </thead>

              <tbody>

                {submissions.map((submission) => (

                  <tr key={submission.id}>

                    <td>{submission.name}</td>
                    <td>{submission.email}</td>
                    <td>{submission.number}</td>
                    <td>{submission.message}</td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>

  );

}

export default App;