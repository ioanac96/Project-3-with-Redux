import React from 'react';
import Header from './Header.js';
import './Upload.less';
import Dropzone from 'react-dropzone';


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

    handleChange(event) {
        const handlePromise = new Promise((resolve, reject) => {
            const modifiedFile = event.target.value;
            resolve(modifiedFile);
        });
        handlePromise.then((modifiedValue) =>{
            this.setState({
                filesArray: [
                    ...this.state.filesArray,
                    modifiedValue
                ]
            });
            console.log("hereIam",modifiedValue);
        })
        
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


    render() {
        const {file, filesArray} = this.state;
        return (
            <div>
                <Header path={this.props.match.path} />
                <div className="main-area">
                    <Dropzone onDrop={acceptedFiles => {
                        console.log("lala",acceptedFiles);
                        this.readFiles(acceptedFiles);
                        
                    }}>
                        {({getRootProps, getInputProps}) => (
                        <section>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                        </section>
                        )}
                    </Dropzone>
                    {
                        filesArray.map ((file) => (<textarea value={file} onChange={this.handleChange} />) )
                    }
                    
                </div>
            </div>
        )
    }
}

export default Upload;