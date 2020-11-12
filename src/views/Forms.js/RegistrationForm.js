import React, { useState } from "react";
import { Form as FormIO } from 'react-formio';
import './style.scss'
import configs from '../../configs'

class RegistrationForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            list: null,
            componentData: null,
            form: null,
            fullName: '',
            submitData: {},
            image: null,
            photos: [],
            file: [null],
            selectedFile: null,
            fileUpload: null,
            errorCode: '',
            submissionData: {
            }
        }
        this.getFormComponents = this.getFormComponents.bind(this)
    }

    componentDidMount() {
        var formID = this.props.match.params.formID;
        this.getFormComponents(formID);
    }

    submitFormData(submission) {
        var bodyData = submission.data;
        console.log("Submission Data", JSON.stringify(bodyData));

    };

    getFormComponents = (formID) => {
        let url = `${configs.constant.HOST_NAME}`;
        const requestOptions = {
            method: 'Post',
            body: JSON.stringify({
                formId: formID,
            })
        };

        fetch(url+'api/university/forms/getComponents', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.err === 200) {
                    let components = data.data.components.components
                    console.log("Test Name Data", components)

                    components.forEach(item => {
                        if (item.key == 'personId') {
                            item.defaultValue = '1234';
                        }
                        if (item.key == 'appointmentCode') {
                            item.defaultValue = 'appointmentCode';
                        }
                        if (item.key == 'patientName') {
                            item.defaultValue = 'patientName';
                        }
                        if (item.key == 'nationalId') {
                            item.defaultValue = 'nationalId';
                        }
                    })
                    this.setState({ form: data.data.components });
                }
            });

    }

    render() {

       console.log("Form Components", JSON.stringify(this.state.form))
        return (
            <div class="container">

                <FormIO
                    form={this.state.form}
                    //all form props
                    submission={{ data: this.state.submissionData }}
                    onSubmit={(submission) => {

                        this.submitFormData(submission)
                        // var promise1 = new Promise((resolve, reject) => {
                        //     setTimeout(function () {
                        //         resolve("foo");
                        //     }, 300);
                        // });

                        // promise1.then((value) => {
                        //     // Reset submission data
                        //     this.setState({ submissionData: {} })
                        // });

                    }}
                />
            </div>
        );
    }
}


export default RegistrationForm;  