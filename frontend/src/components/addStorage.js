import React, { useState, useEffect } from 'react';
import StorageDataService from '../services/storageService';

const AddStorage = () => {
    const initialStorageState = {
        id: null,
        name: "",
        image: undefined,
    };

    const [storage, setStorage] = useState(initialStorageState);
    const [submitted, setSubmitted] = useState(false);
    const [file, setFile] = useState(undefined);
    const [currentFile, setCurrentFile] = useState(undefined);
    const [fileInfo, setFileInfo] = useState([]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setStorage({ ...storage, [name]: value });
    };

    const selectFile = (event) => {
        setFile(event.target.files);
    };

    const saveStorage = () => {
        let currentFile = file;

        setCurrentFile(currentFile);

        var data = {
          name: storage.name,
          image: currentFile
        };
    
        StorageDataService.create(data)
          .then(response => {
            setStorage({
              id: response.data.id,
              name: response.data.name,
              image: response.data.image,
            });
            setSubmitted(true);
            console.log(response.data);
            return StorageDataService.get();
          })
          .then((files) => {
              setFileInfo(files.data);
          })
          .catch(e => {
            console.log(e);
          });
        setFile(undefined);
    };

    useEffect(() => {
        StorageDataService.get().then((response) => {
            setFileInfo(response.data);
        });
    }, []);


    const newStorage = () => {
        setStorage(initialStorageState);
        setSubmitted(false);
    };

    return(
        <div className="submit-form">
            {submitted ? (
                    <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newStorage}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                        type="text"
                        className="form-control"
                        id="name"
                        required
                        value={storage.name}
                        onChange={handleChange}
                        name="name"
                        />
                    </div>

                    <label className="btn btn-default">
                        <input
                        type='file'
                        onChange={selectFile}
                        accept=".jpg, .jpeg, .png"
                        />
                    </label>

                    <button onClick={saveStorage} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
}

export default AddStorage;