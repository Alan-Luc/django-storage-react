import React, { useState, useEffect } from 'react';
import StorageDataService from '../services/storageService';

const AddStorage = () => {
    const initialStorageState = {
        id: null,
        name: "",
        image: null,
    };

    const [storage, setStorage] = useState(initialStorageState);
    const [selectedFile, setSelectedFile] = useState(undefined);
    const [currentFile, setCurrentFile] = useState(undefined);
    const [submitted, setSubmitted] = useState(false);

    const [fileInfos, setFileInfos] = useState([]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setStorage({ ...storage, [name]: value });
    };

    const selectFile = e => {
        setSelectedFile(e.target.files)
    }

    const saveStorage = () => {
        let currentFile = selectFile[0]
        var data = {
          name: storage.name,
          description: storage.description
        };
    
        StorageDataService.create(data)
          .then(response => {
            setStorage({
              id: response.data.id,
              name: response.data.name,
              description: response.data.description,
            });
            setSubmitted(true);
            console.log(response.data);
          })
          .then((files) => {
            setFileInfos(files.data)
          })
          .catch(e => {
            console.log(e);
          });

        setSelectedFile(undefined)
    };

    useEffect(() => {
        StorageDataService.get().then((response) => {
            setFileInfos(response.data)
        })
    }, [])

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
                        />
                    </label>

                    <button onClick={saveStorage} disabled={!selectedFile}className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
}

export default AddStorage;