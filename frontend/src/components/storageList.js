import React, { useState, useEffect } from "react";
import StorageDataService from "../services/storageService";
import { Link } from "react-router-dom";

const StorageList = () => {
  const [storage, setStorage] = useState([]);
  const [currentStorage, setCurrentStorage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    retrieveStorage();
  }, []);

  const onChange = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveStorage = () => {
    StorageDataService.getAll()
      .then(response => {
        setStorage(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveStorage();
    setCurrentStorage(null);
    setCurrentIndex(-1);
  };

  const setActiveStorage = (storage, index) => {
    setCurrentStorage(storage);
    setCurrentIndex(index);
  };

  const removeAllStorage = () => {
    StorageDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {
    StorageDataService.findByName(searchName)
      .then(response => {
        setStorage(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChange}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Entries List</h4>

        <ul className="list-group">
          {storage &&
            storage.map((storage, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveStorage(storage, index)}
                key={index}
              >
                {storage.name}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={() => removeAllStorage()}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentStorage ? (
          <div>
            <h4>Entry</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentStorage.name}
            </div>
                <img src={currentStorage.image} width="400vw"/>
            <div>

            </div>

            <Link
              to={"/storage/" + currentStorage.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on an Entry...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StorageList;