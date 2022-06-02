import { getDownloadURL } from 'firebase/storage';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { uploadCertificate } from '../../firebase/storageController';
import { isValidImage, nameRegex } from '../../validations/FormValidations';

const NewCertificate = ({ setShowing }) => {
    const [fileName, setFileName] = useState('');
    const [file, setFile] = useState('');
    const [filePreview, setFilePreview] = useState('');
    const [fileError, setFileError] = useState('');
    const [fileNameError, setFileNameError] = useState('');
    const [uploadPercent, setUploadPercent] = useState(0);

    const uploadFile = () => {
        const uploadState = uploadCertificate(file, fileName);
        if (uploadState) {
            uploadState.on(
                'state_changed',
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
                    );

                    setUploadPercent(percent);
                },
                (err) =>
                    toast.error('Error uploading certificate. Try again later'),
                () => {
                    getDownloadURL(uploadState.snapshot.ref).then((url) => {
                        console.log(url);
                        setShowing(false);
                        toast.success('Certificate saved');
                    });
                },
            );
        }
    };

    const fileNameChanged = ({ target }) => {
        setFileName(target.value);
        setFileNameError(
            !nameRegex.test(target.value)
                ? 'File name must be alphanumerics and at list 4 characters (A-z, 0-9, _)'
                : '',
        );
    };

    const fileChanged = ({ target }) => {
        let file = target.files[0];
        setFile(file);
        setFilePreview(URL.createObjectURL(file));
        setFileError(!isValidImage(file) ? 'Select a valid image' : '');
    };

    return (
        <div className="container border rounded p-5 mt-5">
            <h1 className="text-center">Upload a new certificate</h1>
            <div className="mb-2">
                {filePreview && (
                    <img
                        src={filePreview}
                        className="rounded mx-auto d-block mt-4"
                        alt="image-selection"
                    />
                )}
                <label htmlFor="file-input" className="form-label">
                    <b>Choose your certificate</b>
                </label>
                <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    onChange={fileChanged}
                    className="form-control"
                    placeholder="Name"
                    required
                />
                {fileError && (
                    <p className="text-start text-danger mt-1">{fileError}</p>
                )}
                <label htmlFor="name-input-file" className="form-label mt-3">
                    <b>Image name</b>
                </label>
                <input
                    id="name-input-file"
                    type="email"
                    value={fileName}
                    onChange={fileNameChanged}
                    className="form-control"
                    placeholder="Google_Server_Managment_Certificate"
                />
                {fileNameError && (
                    <p className="text-start text-danger mt-1">
                        {fileNameError}
                    </p>
                )}
            </div>
            <p className="mt-3">
                <b>Loading status</b>
            </p>
            <div className="progress mb-5">
                <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${uploadPercent}%` }}
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                />
            </div>
            <div className="text-center">
                <button
                    className="btn btn-danger me-5"
                    onClick={() => setShowing(false)}
                >
                    Cancel
                </button>
                <button
                    className="btn btn-primary"
                    onClick={uploadFile}
                    disabled={!file || fileError}
                >
                    Upload
                </button>
            </div>
        </div>
    );
};
export default NewCertificate;
