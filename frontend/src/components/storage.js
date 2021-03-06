import React, { useState, useEffect } from "react";
import StorageDataService from "../services/storageService";

const Storage = (props) => {
  const initialStorageState = {
    id: null,
    name: "",
    description: "",
    completed: false
  };
  const [currentStorage, setCurrentStorage] = useState(initialStorageState);
  const [message, setMessage] = useState("");

  const getStorage = id => {
    StorageDataService.get(id)
      .then(res => {
        setCurrentStorage(res.data);
        console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getStorage(props.match.params.id);
  }, [props.match.params.id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCurrentStorage({ ...currentStorage, [name]: value });
  };

  const updateCompleted = status => {
    var data = {
      id: currentStorage.id,
      name: currentStorage.name,
      image: currentStorage.image,
    };

    StorageDataService.update(currentStorage.id, data)
      .then(res => {
        setCurrentStorage({ ...currentStorage, completed: status });
        console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateStorage = () => {
    StorageDataService.update(currentStorage.id, currentStorage)
      .then(res => {
        console.log(res.data);
        setMessage("The entry was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteStorage = () => {
    StorageDataService.remove(currentStorage.id)
      .then(res => {
        console.log(res.data);
        props.history.push("/storage");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentStorage ? (
        <div className="edit-form">
          <h4>Entry</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Name</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="name"
                value={currentStorage.name}
                onChange={handleChange}
              />
            </div>
            <div className ="form-group">
                <input
                type='file'
                onChange={handleChange}
                />
            </div>
          </form>

          

          <button className="badge badge-danger mr-2" onClick={() => deleteStorage()}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateStorage}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on an entry...</p>
        </div>
      )}
    </div>
  );
};

export default Storage;