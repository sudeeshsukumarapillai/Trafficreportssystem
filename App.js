import React, { useEffect, useState } from 'react';
import M from 'materialize-css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

import logo from './logo.svg';
import logos from './appIcon.png';
import './App.css';

function App() {
  const [publicReports, setPublicReports] = useState([]);
  const [db, setDb] = useState(null); // Initialize db state

  useEffect(() => {
    // Initialize Materialize components after the component mounts
    M.AutoInit();

    // Initialize Firebase
    const firebaseConfig = {
      apiKey: "AIzaSyBt1hljgLvYvlFgYyhccoF8SNENhczaiCo",
      authDomain: "public-transport-d6788.firebaseapp.com",
      projectId: "public-transport-d6788",
      storageBucket: "public-transport-d6788.appspot.com",
      messagingSenderId: "500024395973",
      appId: "1:500024395973:web:d84cfb669d43816fdf08ac",
      measurementId: "G-JY9JRPD2M3"
    };

    const app = initializeApp(firebaseConfig);
    const firestoreDb = getFirestore(app);
    setDb(firestoreDb); // Set the db state

    // Fetch public reports from Firestore
    const fetchPublicReports = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestoreDb, 'publicReports'));
    
        const reportsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    
        setPublicReports(reportsData);
      } catch (error) {
        console.error('Error fetching public reports:', error);
      }
    };

    // Call the fetch function
    fetchPublicReports();
  }, []);

  const handleDelete = async (reportId) => {
    try {
      // Use the Firebase API to delete the document
      const docRef = await deleteDoc(doc(db, 'publicReports', reportId));

      // Update the state to reflect the changes
      setPublicReports((prevReports) =>
        prevReports.filter((report) => report.id !== reportId)
      );

      console.log('Document successfully deleted!', docRef);
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };


  return (
    <div className="App">
      <nav>
        <div className="nav-wrapper purple lighten-1">
          <a href="#!" className="brand-logo center">
            Public Transport Services
          </a>
        </div>
      </nav>

      <div className="section">
        <h4>Welcome to Public Transport Services!</h4>
        <p>
          Report issues, provide feedback, or share suggestions related to public transport services in your area.
          Your input helps us enhance the commuting experience for everyone.
        </p>
        <p>
          Whether it's a delayed bus, cleanliness concern, or an idea for improvement, your voice matters.
          Join us in shaping a more efficient and comfortable public transportation system!
        </p>
      </div>

      <div id="centered" className="section scrollspy">
        <div className="row">
          <div className="col s12">
            <table className="centered highlight">
              <thead>
                <tr>
                  <th style={{ fontSize: 15, color: "#8d0fdb" }}>Username</th>
                  <th style={{ fontSize: 15, color: "#8d0fdb" }}>Location</th>
                  <th style={{ fontSize: 15, color: "#8d0fdb" }}>Report Title</th>
                  <th style={{ fontSize: 15, color: "#8d0fdb" }}>Report Description</th>
                  <th style={{ fontSize: 15, color: "#8d0fdb" }}>Reported Image</th>
                  <th style={{ fontSize: 15, color: "#8d0fdb" }}>Timestamp</th>
                  <th style={{ fontSize: 15, color: "#8d0fdb" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {publicReports.map((report) => (
                  <tr key={report.id}>
                    <td style={{ fontWeight: "bold" }}>{report.username}</td>
                    <td>{report.postLocation}</td>
                    <td>{report.postTitle}</td>
                    <td>
                      <span className="tooltipped" data-position="top" data-tooltip={report.postDescription}>
                        {report.postDescription}
                      </span>
                    </td>
                    <td>
                      <img src={report.imageUrl ?? logos} alt={`Reported Image ${report.id}`} className="report-image" />
                    </td>
                    <td>{new Date(report.timestamp.toDate()).toLocaleString()}</td>
                    <td>
                      <button
                        className="waves-effect waves-light btn red"
                        onClick={() => handleDelete(report.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <footer className="page-footer purple">
        <div className="container">
          <div className="row">
            <div className="col s12">
              <p>&copy; 2023 Public Transport Services</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
