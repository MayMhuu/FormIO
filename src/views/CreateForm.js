import React from 'react';
import ReactDOM from 'react-dom';
import { FormBuilder } from 'react-formio';
import Dropdown from 'react-dropdown';
import { Button, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import configs from '../configs';

export default class CreateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formSchema: null,
            options1: [
                'form', 'wizard'
            ],
            options: [
                { value: 'form', label: 'Form' },
                { value: 'wizard', label: 'Wizard', className: 'myOptionClassName' },
            ],
            display: 'wizard',
            formName: "",
            uniID: "",
            value: 'form'
        }
        this.handleChange = this.handleChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        console.log("Catch Uni")
        var id = this.props.match.params.universityId;
        var name = this.props.match.params.universityName;

        this.setState({ uniID: id })

    }

    createForm = () => {

        var fName = this.state.formName;
        var value = this.state.value;

        console.log("Display Type", this.state.value)

        var universityId = this.state.uniID;
        if (fName == '') {
            alert("Can not be null")
        }
        //alert("Name", fName)

        console.log("Name", this.state.formName)

        let createComponent = this.state.formSchema;

        console.log("Create Component", JSON.stringify(createComponent));
        const requestOptions = {

            method: 'POST',
            body: JSON.stringify({
                universityId: universityId,
                formName: fName,
                displayType: value,
                components: createComponent
            })
        };

        let url = `${configs.constant.HOST_NAME}`;
        fetch(url + 'admin/university/forms/createForm', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.err === 200) {
                    //console.log("Success", data)
                    this.props.history.goBack();
                }
                else {
                    console.log("Error", data)
                }
            }
            );
        //  .then(data => this.setState({ formList: data.data }));
    }

    _onSelect = (event) => {
        // this.log('change', event.target.value); 
        this.setState({ display: event.target.value })
    }

    handleChange(event) {
        this.setState({ formName: event.target.value });

        console.log("Form Name", this.state.formName)
    }
    onChange(event) {
        this.setState({ value: event.target.value });

        console.log("Form Name", this.state.value)
    }

    onFormSubmit(event) {

        console.log('onFormSubmit', this.state.formName)
        event.preventDefault();

    };

    render() {

        console.log('Display', this.state.display);

        return (
            <div>
                <div className="App">
                    <div class="row" style={{ paddingTop: '15px', paddingBottom: '10px' }}>

                        <div class="col-md-1" ></div>
                        <div class="col-md-10" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                            <div class="row">
                                <div class="col-md-4" >
                                    <label for="title" class="field-required label_custom">
                                        Name:
                                    </label>
                                </div>
                                <div class="col-md-2" >
                                    <label for="title" class="field-required label_custom">
                                        Display as:
                                    </label>
                                </div>
                                <div class="col-md-4" >

                                </div>
                                <div class="col-md-2" >

                                </div>

                            </div>
                            <div class="row">
                                <div class="col-md-4" >

                                    <input class="text_custom" type="text" value={this.state.formName} onChange={this.handleChange} />

                                </div>
                                <div class="col-md-2" >

                                    <select class="select_custom" value={this.state.value} onChange={this.onChange}>
                                        <option value="form">Form</option>
                                        <option value="wizard">Wizard</option>
                                    </select>
                                </div>
                                {/* <div class="col-md-4" >
    
                                    <select value={this.state.value} onChange={this.onChange}>
                                        <option value="form">Form</option>
                                        <option value="wizard">Wizard</option>
                                    </select>
                                </div> */}
                                <div class="col-md-4">
                                    <button class="f_button f_button1" onClick={this.createForm}>
                                        Save Form
                                    </button>
                                    {/* <Button color="primary" onClick={() => { this.createForm() }} className="text-right" type='button' className='pull-right btn-brand'>
                                        <span> Save Form</span>
                                    </Button> */}
                                </div>
                                <div class="col-md-2" >
                                </div>
                            </div>

                        </div>
                        <div class="col-md-1" ></div>

                    </div>
                    <div class="row">
                        <div class="col-md-1" ></div>
                        <div class="col-md-10" style={{ height: '2px', backgroundColor: '#e9ecef' }}></div>
                        <div class="col-md-1" ></div>
                    </div>
                    <div class="row" style={{ paddingTop: '15px', paddingBottom: '10px', width: '100%' }}>
                        <div class="col-md-1" ></div>
                        <div class="col-md-10">
                            <FormBuilder
                                form={{
                                    display: this.state.value,
                                    customClass: "justify-content-center"
                                }}
                                onChange={schema => {
                                    this.setState({ formSchema: schema })
                                    console.log("Create Component", JSON.stringify(schema));
                                    // setSubmission({ ...customEvent.data, lastName: "Laaast Name" });
                                }}
                            />
                        </div>
                        <div class="col-md-1" ></div>
                    </div>
                    <div class="row" style={{marginTop:'20px'}}>
                        <div class="col-md-1" ></div>
                        <div class="col-md-10" style={{ height: '2px', backgroundColor: '#e9ecef' }}></div>
                        <div class="col-md-1" ></div>
                    </div>
                </div>

            </div>
        )
    }
}