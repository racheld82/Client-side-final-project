
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
const FileUpload = () => {
    const {familyIndex} = useParams();
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [retrievedFile, setRetrievedFile] = useState(null);
    const [allFiles, setAllFiles] = useState([]);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setUploadStatus('');
    };

    const handleFileUpload = async () => {
        if (!selectedFile) {
            setUploadStatus('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('familyIndex', familyIndex);
        try {
            const response = await fetch('http://localhost:8080/member/upload', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                const data = await response.json();
                setUploadStatus('File uploaded successfully');
                console.log('File uploaded successfully', data);
            } else {
                throw new Error('Failed to upload file');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            setUploadStatus('Error uploading file');
        }
    };

    //DOES IT MAKE SENCE THAT A USER WILL SOME HOW ASKS FOR A SPECIFIC IMAGE? 
    // const fetchUploadedFile = async (fileId) => {
    //     try {
    //         const response = await fetch(`http://localhost:8080/member/files/${fileId}`);
    //         if (response.ok) {
    //             const fileData = await response.json();
    //             console.log("fileData: ", fileData);
    //             setRetrievedFile(fileData);
    //         } else {
    //             throw new Error('Failed to fetch file details');
    //         }
    //     } catch (error) {
    //         console.error('Error fetching file details:', error);
    //     }
    // };

    const handleViewAllImages = async () => {
        try {
            const response = await fetch(`http://localhost:8080/member/files?familyIndex=${familyIndex}`);//Fix this to familyIndex
            if (response.ok) {
                const files = await response.json();
                setAllFiles(files); // Store all files in state
            } else {
                throw new Error('Failed to fetch all files');
            }
        } catch (error) {
            console.error('Error fetching all files:', error);
        }
    };

    const displayImage = (file) => {
        const arrayBufferView = new Uint8Array(file.data.data);
        const blob = new Blob([arrayBufferView], { type: file.mimeType });
        const imageUrl = URL.createObjectURL(blob);
        return imageUrl;
    };

    const handleFileDelete = (fileId) => {
        fetch(`http://localhost:8080/member/files/${fileId}`, { method: 'DELETE' })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to delete file');
                }
                return response.json();
            })
            .then(() => {                
                setAllFiles(allFiles.filter(file => file.fileId !== fileId));
                console.log(`File with id ${fileId} deleted successfully`);
            })
            .catch((error) => console.error('Error deleting file:', error));
    };
    
    return (
        <div>
            <h2>העלה קובץ חדש</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload</button>
            {uploadStatus && <p>{uploadStatus}</p>}
            {retrievedFile && (
                <div>
                    <h3>Uploaded File Details:</h3>
                    <p>Filename: {retrievedFile.fileName}</p>
                    <p>MIME Type: {retrievedFile.mimeType}</p>
                    {/* Display the uploaded image */}
                    <img src={displayImage(retrievedFile)} alt={retrievedFile.fileName} style={{ maxWidth: '100%', maxHeight: '400px' }} />
                </div>
            )}
            <div className='files-container'>
                <button onClick={handleViewAllImages}>צפה בכל הקבצים</button>
                {allFiles.length > 0 && (
                    <div>
                        <h3>All Uploaded Files:</h3>
                        <ul>
                            {allFiles.map(file => (
                                <li key={file.fileId}>
                                    <p>{file.fileName} :שם הקובץ</p> 
                                    <button onClick={() => handleFileDelete(file.fileId)}>מחק קובץ</button>                                   
                                    <img src={displayImage(file)} alt={file.fileName} style={{ maxWidth: '100%', maxHeight: '400px' }} />
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileUpload;
