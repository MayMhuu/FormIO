import React, { useState } from "react";
import { Form as FormIO } from 'react-formio';
import { ExternalLink } from 'react-external-link';
import { Route } from 'react-router-dom';
import componentDataList from '../componentData.json'
import configs from '../configs'
//import './styles.scss';


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
            selectedFile: null
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

        let body = {
            action: "create",
            formId: formID,
            universityId: "5f449731e9a1061265d2b2fc",
            deviceId: "5b4588ba164e12f6345",
            data: submission.data
        }

        const myArrStr = JSON.stringify(body);
        console.log("Request Body", JSON.stringify(body))

        window.postMessage("Submitted String" + myArrStr);

        const requestOptions = {
            method: 'Post',
            headers: {
                // 'Accept': 'application/json',
                // 'Content-Type': 'application/json',
                'Authorization': 'Bearer b74d65de-2bce-45b8-a59a-2f30bb7d7a12'
            },
            body: JSON.stringify({
                action: "create",
                formId: formID,
                universityId: "5f449731e9a1061265d2b2fc",
                deviceId: "5b4588ba164e12f6345",
                data: submission.data
            })
        };

        let url = `${configs.constant.HOST_NAME}`;

        fetch(url + 'api/university/forms/submitData', requestOptions)
            .then(response => response.json())
            //   .then(data => console.log("Response Submit Data", data));
            .then(data => {
                if (data.err === 200) {
                    console.log("Success", data)
                    alert("Successfully Sumitted")
                    window.postMessage("Success " + data.data.inserted.id);
                }
                else {
                    console.log("Error", data.err)
                    alert("Failed to submit")
                    window.postMessage("Error " + data.err);
                }
            }
            );
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
            <div className="main">

                <FormIO
                    //src="https://xojgwtxalpylmpd.form.io/registration"
                    form={this.state.form}
                    onSubmit={(submission) => this.submitFormData(submission)}
                    onSubmitDone={a => {
                    }}
                    onCustomEvent={customEvent => {

                        this.setState({
                            fullName: customEvent.data
                        })

                        console.log("Full Name", customEvent);
                        // setSubmission({ ...customEvent.data, lastName: "Laaast Name" });
                    }}
                />
            </div>
        );
    }
}



export default RegistrationForm;