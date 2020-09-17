import React, { useState } from "react";
import { Form as FormIO } from 'react-formio';
import { ExternalLink } from 'react-external-link';
import { Route } from 'react-router-dom';
import componentDataList from '../componentData.json'
import configs from '../configs'
import '../scss/_formStyles.scss'
import fs from 'fs';
import axios from 'axios'
import { Input } from 'reactstrap';
const FormData = require('form-data')

class RegistrationForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            yearList: [],
            list_year: null,
            list: null,
            componentData: null,
            form: null,
            fullName: '',
            submitData: {},
            image: null,
            photos: [],
            file: [null],
            selectedFile: null,
            fileUpload: null
        }
        this.getFormComponents = this.getFormComponents.bind(this)
    }

    componentDidMount() {

        console.log("PathName", this.props.location.pathname)

        var formID = this.props.match.params.formID;
        console.log("URL ID", formID);
        this.getFormComponents(formID);
        // console.log("listOjb.......", componentDataList);
        // this.setState({ componentData: componentDataList.components })

    }

    submitFormData = (submission) => {

        var formID = this.props.match.params.formID;

        let imageUrl = submission.data.upload_avatar[0];

        const base64String = imageUrl.url;

        var file = this.dataURLtoFile(base64String, imageUrl.originalName);
        console.log("file - type", file);


        //     let baseFile = null;
        //     let fileName = "";
        // //convert file to base 64
        //     let fileToLoad = file;
        //     fileName = fileToLoad.name;
        //     // FileReader function for read the file.
        //     let fileReader = new FileReader();
        //     fileReader.onload = function (fileLoadedEvent) {
        //         baseFile = fileLoadedEvent.target.result;
        //         console.log("Base File",baseFile);
        //     };
        //     fileReader.readAsDataURL(fileToLoad);

            console.log("File ", submission.data);

      

        // return request.sendRequest(path, data, 'POST');

        // console.log("Request Data ", request_data);

        // window.postMessage("Submitted String" + myArrStr);

        // window.ReactNativeWebView.postMessage("Submitted String" + 'Hi') //for react-native-webview
        // window.ReactNativeWebView.postMessage("Submitted String" + myArrStr);

        let res = {
            upload_avatar:[],
            full_name: "Test",
            phone_number: "09342423423"
        }

        var bodyFormData = new FormData();
        bodyFormData.append('action', 'create');
        bodyFormData.append('formId', formID);
        bodyFormData.append('universityId', '5f449731e9a1061265d2b2fc');
        bodyFormData.append('deviceId', '5b4588ba164e12f6345');
        bodyFormData.append("upload_avatar", file);
        bodyFormData.append('data', res);

        console.log("bodyFormData", bodyFormData)

        let url = `${configs.constant.HOST_NAME}`;

        axios({
            method: 'post',
            url: url + 'api/university/forms/submitData',
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(function (response) {
                //handle success
                console.log("Response Data", JSON.stringify(response));

                if (response.data.err === 200) {
                    console.log("Success", response.data.data.inserted.upload_avatar)
                    alert("Successfully Sumitted")
                    window.ReactNativeWebView.postMessage("Success " + response.data.data.inserted.upload_avatar);

                }
                else {
                    console.log("Error", response.data)
                    alert("Failed to submit" + response)
                    window.ReactNativeWebView.postMessage("Error " + response);
                }
            })
            .catch(function (response) {
                //handle error
                console.log("Catch Data", response);
            });

    }

    uploadFile(file) {
        try {
            let formData = new FormData();
            formData.append('files', file);

            console.log("File Data", formData)
            // let rs = await request.upload(`/api/file/upload-file`, formData);
            // if (this.props.onChange) {
            //     this.props.onChange(rs.created[0].id);
            // }

            this.setState({ fileUpload: file })
        } catch (err) {
            // helper.alert(err.message);
            console.log(err)
        }
    }

    uploadAction() {

        var body = {
            userName: 'Fred',
            userEmail: 'Flintstone@gmail.com'
        }

        axios({
            method: 'post',
            url: 'myurl',
            data: body,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(function (response) {
                //handle success
                console.log(response);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    }

    dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }

    urltoFile(url, filename, mimeType) {
        mimeType = mimeType || (url.match(/^data:([^;]+);/) || '')[1];
        return (fetch(url)
            .then(function (res) { return res.arrayBuffer(); })
            .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
        );


        // var dataURL = canvas.toDataURL('image/jpeg', 0.5);
        // var blob = dataURItoBlob(dataURL);
        // var fd = new FormData(document.forms[0]);
        // fd.append("canvasImage", blob);
    }

    handleUploadFile(event) {
        let selectedFile = event.target.files;
        let file = null;
        let fileName = "";
        //Check File is not Empty
        if (selectedFile.length > 0) {
            // Select the very first file from list
            let fileToLoad = selectedFile[0];
            fileName = fileToLoad.name;
            // FileReader function for read the file.
            let fileReader = new FileReader();
            // Onload of file read the file content
            fileReader.onload = function (fileLoadedEvent) {
                file = fileLoadedEvent.target.result;
                // Print data in console
                console.log(file);
            };
            // Convert data to base64
            fileReader.readAsDataURL(fileToLoad);
        }

        //   this.setState({
        //     fileData: file,
        //     fileName: fileName
        //   })
    }

    getFormComponents = (formID) => {
        const requestOptions = {
            method: 'Post',
            //   headers: {
            //     'Accept': 'application/json',
            //     'Content-Type': 'application/json',
            //     'Authorization': 'Basic hQCOKs75uoYxakySqIA7qrjzdj2Z9PYn'
            //   },
            body: JSON.stringify({
                formId: formID,
            })
        };

        let url = `${configs.constant.HOST_NAME}`;
        fetch(url + 'api/university/forms/getComponents', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ form: data.data.components }));
    }

    onChangeHandler = event => {
        var file = event.target.files[0];

        console.log("File Data", file);
        // if return true allow to setState
        this.setState({
            selectedFile: file
        });
    }

    fileUploadHandler = () => {

        console.log("FormUploadn Data");

        const data = new FormData()
        console.log(this.state.selectedFile);
        data.append('file', this.state.selectedFile)


        console.log("FormUploadn Data", data);

    }

    onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                this.setState({ src: reader.result });

                this.setState({ modalShowHide: "custom_modal show" });
            }

            );
            reader.readAsDataURL(e.target.files[0]);
        }
    };


    render() {
        const runFirst = `window.ReactNativeWebView.postMessage("this is message from web");`;
        return (

            <FormIO
                // src="https://xojgwtxalpylmpd.form.io/registration"
                form={this.state.form}
                onSubmit={(submission) => this.submitFormData(submission)}
                onSubmitDone={a => {
                }}
                onCustomEvent={customEvent => {
                    this.setState({
                        fullName: customEvent.data
                    })
                    console.log("Full Name", customEvent);
                }}
            />
        );
    }
}



export default RegistrationForm;