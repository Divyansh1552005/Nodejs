import { useState, useEffect } from 'react'
import './App.css'
import axios from "axios"



function App() {
  const [jokes, setJokes] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploadStatus, setUploadStatus] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  
  // since hame application load hote hi data chayie so we will be using useEffect
  useEffect(() => {
    axios.get("/api/jokes")
    .then((res) => {
      // console.log(res.data)
      setJokes(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
    setUploadStatus('') // Clear previous status
  }

  // Handle file upload
  const handleFileUpload = async (e) => {
    e.preventDefault()
    
    if (!selectedFile) {
      setUploadStatus('Please select a file first!')
      return
    }

    setIsUploading(true)
    setUploadStatus('')

    const formData = new FormData()
    formData.append('file', selectedFile)

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      setUploadStatus('File uploaded successfully!')
      setSelectedFile(null)
      // Reset the file input
      e.target.reset()
      console.log('Upload response:', response.data)
    } catch (error) {
      setUploadStatus('Upload failed: ' + (error.response?.data?.message || error.message))
      console.error('Upload error:', error)
    } finally {
      setIsUploading(false)
    }
  }


  return (
    <>
      <h1>Joke Generator</h1>
      <p> JOKES : {jokes.length}</p>

      {
        jokes.map((joke) => (
          <div key={joke.id}> 
            <h3>{joke.title}</h3>
            <p>{joke.content}</p>
          </div>
        ))
      }


      {/* File Upload Section */}
      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>Upload a File</h2>
        <form onSubmit={handleFileUpload}>
          <input 
            type="file" 
            name="file"
            onChange={handleFileChange}
            disabled={isUploading}
            style={{ marginBottom: '1rem' }}
          />
          <br />
          <button 
            type="submit" 
            disabled={isUploading || !selectedFile}
            style={{ 
              padding: '0.5rem 1rem', 
              backgroundColor: isUploading ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isUploading ? 'not-allowed' : 'pointer'
            }}
          >
            {isUploading ? 'Uploading...' : 'Upload File'}
          </button>
        </form>
        
        {/* Display selected file info */}
        {selectedFile && (
          <div style={{ marginTop: '1rem', padding: '0.5rem', backgroundColor: '#f0f0f0' }}>
            <strong>Selected File:</strong> {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
          </div>
        )}
        
        {/* Display upload status */}
        {uploadStatus && (
          <div 
            style={{ 
              marginTop: '1rem', 
              padding: '0.5rem', 
              borderRadius: '4px',
              backgroundColor: uploadStatus.includes('successfully') ? '#d4edda' : '#f8d7da',
              color: uploadStatus.includes('successfully') ? '#155724' : '#721c24',
              border: `1px solid ${uploadStatus.includes('successfully') ? '#c3e6cb' : '#f5c6cb'}`
            }}
          >
            {uploadStatus}
          </div>
        )}
      </div>
    </>

  )
}

export default App
