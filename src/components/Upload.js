import React from 'react';
import Header from './Header.js';
import './Upload.less';
import Dropzone from 'react-dropzone';
import { faTimesCircle, faTimes, faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



class Upload extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            file: '',
            filesArray: []
        };

        this.readFiles = this.readFiles.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getFile = this.getFile.bind(this);
        this.handleOnCloseSingleFile = this.handleOnCloseSingleFile.bind(this);
        this.handleOnCloseAll = this.handleOnCloseAll.bind(this);
    }

    
    readFiles(files) {
        const promises = files.map(file => this.getFile(file));
        Promise.all(promises).then((values) => {
            this.setState({
                filesArray: [
                    ...this.state.filesArray,
                    ...values
                ]
            });
        })
    }

    handleChange(index) {
        return (event) => {
        
            const newFilesArray = this.state.filesArray.map((file, fileIndex) => {
                if(fileIndex === index) return event.target.value;
                else return file;
            });

            console.log("Array",newFilesArray);

            this.setState({
                filesArray: newFilesArray
            });
            console.log("Index is:", index);
        }
    }

    getFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                const string = reader.result;
                resolve(string);
            }
            reader.readAsText(file);
        })
    }

    handleOnCloseSingleFile(index) {
        const newFilesArray = this.state.filesArray.filter((file,fileIndex) => fileIndex !== index);
        this.setState({
            filesArray: newFilesArray
        });
    }

    handleOnCloseAll() {
        this.setState({
            filesArray: []
        });
    }

    downloadFile(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);     
    }


    render() {
        const {file, filesArray} = this.state;
        return (
            <div>
                <Header path={this.props.match.path} />
                <div className="main-area">
                    <Dropzone onDrop={acceptedFiles => {
                        this.readFiles(acceptedFiles);
                        
                    }}>
                        {({getRootProps, getInputProps}) => (
                        <section>
                        <div className="dropzone-section" {...getRootProps()} >
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                        </section>
                        )}
                    </Dropzone>
                    <div className="files-area">
                    {
                        filesArray.map ((file,index) => (
                        <div className="file-area">
                            <textarea value={file} onChange={this.handleChange(index)} />
                            <div className="icons-area">
                                <FontAwesomeIcon className="icon" icon={faTimesCircle} onClick={() => {this.handleOnCloseSingleFile(index)}}/>
                                <FontAwesomeIcon className="icon" icon={faAngleDoubleDown} onClick={() => {this.downloadFile(index,file)}}/>
                            </div>
                        </div>))
                    }
                    </div>
                    {
                        (filesArray.length != 0) ? (filesArray.length > 1) ? 
                        <div className="close-all-section">
                            <div className="close-all">Close all</div>
                            <FontAwesomeIcon className="close-icon" icon={faTimes} onClick={() => {this.handleOnCloseAll()}} />
                        </div> : null : null
                    }
                    
                </div>
            </div>
        )
    }
}

export default Upload;