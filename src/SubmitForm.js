import React, { useState } from "react";
import { Form as FormIO } from 'react-formio';
import { ExternalLink } from 'react-external-link';
import { Route } from 'react-router-dom';
import componentDataList from './componentData.json'
import configs from './configs'


class SubmitForm extends React.Component {

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

        console.log("PatheName",this.props.location.pathname)

        var formID = this.props.match.params.formID;
        console.log("URL ID", formID);
        this.getFormComponents(formID);
        // console.log("listOjb.......", componentDataList);
        // this.setState({ componentData: componentDataList.components })

    }

    submitFormData = (submission) => {

        var formID = this.props.match.params.formID;
        console.log("Submition Data", JSON.stringify(submission.data))
     //   window.postMessage("Success");

        const requestOptions = {
            method: 'Post',
            headers: {
                // 'Accept': 'application/json',
                // 'Content-Type': 'application/json',
                'Authorization': 'Bearer 52cd6860-7cbf-441f-af20-5e7a093c28b5'
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

        // fetch(url + 'api/university/forms/submitData', requestOptions)
        //     .then(response => response.json())
        //  //   .then(data => console.log("Response Submit Data", data));
        //     .then(data => {
        //         if (data.err === 200) {
        //             console.log("Success", data)
        //             //this.props.history.goBack();
        //         }
        //         else {
        //             console.log("Error", data)
        //         }
        //     }
        //     );


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
                    // src="https://xojgwtxalpylmpd.form.io/registration"
                    form={this.state.form}

                    // onSubmit={item => {
                    //     console.log("Submittion", item);
                    //     this.submitFormData(item.data)
                    // }}
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



export default SubmitForm;