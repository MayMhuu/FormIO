import * as axios from "axios";
import React, { Component } from "react";
import { Form } from "react-formio";
import i18n from "../../lang";
import myanmar from '../../lang/my';
import english from '../../lang/en';
import Switch from "react-switch";

class LanguageForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: undefined,
            admin: true,
            currentLanguage: 'en',
            isOnLanguageSwitch: false,
            opts: {
                readOnly: false,
                language: "en",
                i18n: {
                    en: english,
                    my: myanmar
                }
            },
            display: "",
            formComponent: undefined,
        };
        this.handleSubmitFunction = this.handleSubmitFunction.bind(this);
        this.convertLanguage = this.convertLanguage.bind(this);
        this.getFormComponents = this.getFormComponents.bind(this);
        this._listenForLanguageChange = this._listenForLanguageChange.bind(this);
       
    }

    componentDidMount() {

        // this.setState({ form: components });

        this.getFormComponents('5f6813b08d1d4250608749df');
        let components = {
            components: [
                {
                    unique: false,
                    suffix: "",
                    conditional: {
                        show: "",
                        when: null,
                        eq: ""
                    },
                    hidden: false,
                    clearOnHide: true,
                    defaultValue: "",
                    tableView: true,
                    label: "Email",
                    protected: false,
                    placeholder: "",
                    properties: {
                        "": ""
                    },
                    kickbox: {
                        enabled: false
                    },
                    type: "email",
                    hideLabel: false,
                    prefix: "",
                    tags: ["admin"],
                    input: true,
                    persistent: true,
                    inputType: "email",
                    key: "email",
                    labelPosition: "top"
                },
                {
                    suffix: "",
                    properties: {
                        "": ""
                    },
                    hidden: false,
                    lockKey: true,
                    clearOnHide: true,
                    defaultValue: "",
                    validate: {
                        step: "any",
                        integer: "",
                        multiple: "",
                        required: false,
                        max: "",
                        min: "",
                        custom: ""
                    },
                    tableView: true,
                    label: "Number",
                    protected: false,
                    placeholder: "",
                    conditional: {
                        show: "",
                        when: null,
                        eq: ""
                    },
                    type: "number",
                    hideLabel: false,
                    prefix: "",
                    tags: ["print", "admin"],
                    input: true,
                    persistent: true,
                    inputType: "number",
                    key: "number",
                    labelPosition: "top"
                },
                {
                    type: "button",
                    label: "Submit",
                    action: "submit",
                    theme: "primary"
                }
            ]
        };
        // this.setState({ form: components });
    }


    getFormComponents = (formID) => {
        const requestOptions = {
            method: 'Post',
            body: JSON.stringify({
                formId: formID,
            })
        };

        fetch('https://dev-moe-api.ayainnovation.com/api/university/forms/getComponents', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.err === 200) {
                    console.log("Form", data.data.components.display)
                    this.setState({ formComponent: data.data.components.components, display: data.data.components.display });
                }
            });
    }

    _listenForLanguageInitial() {

        if (this.state.currentLanguage == 'my') {
            this.setState({ isOnLanguageSwitch: false });
        } else {
            this.setState({ isOnLanguageSwitch: true });
        }
    }

    componentWillMount() {
        this._listenForLanguageInitial();
    }


    convertLanguage() {
        //console.log("Click event")
        // console.log("Lang", this.state.opts.language)

        if (this.state.currentLanguage == this.state.opts.language) {
            var opts = this.state.opts;
            opts.language = "en";

            var form = this.state.formComponent;
            form.language = "en";

            var language = this.state.language;
            language = "en"

            this.setState({ form, opts, language });

        }

        // var opts = this.state.opts;
        // opts.language = "en";

        // var form = this.state.formComponent;
        // form.language = "en";

        // this.setState({ form, opts });

        console.log("Lang_F", this.state.formComponent.language + this.state.opts.language + this.state.language)

    }

    handleChange(isOnLanguageSwitch) {
        this.setState({ isOnLanguageSwitch });
    }

    _listenForLanguageChange() {

        if (this.state.isOnLanguageSwitch) {
            var opts = this.state.opts;
            opts.language = "en";

            var language = this.state.language;
            language = "en"
        } else {
            var opts = this.state.opts;
            opts.language = "my";

            var language = this.state.language;
            language = "my"
        }
    }

    render() {
        this._listenForLanguageChange()
        return (
            <div>
                {/* <input
                    type="choice"
                    onChange={this.convertLanguage}
                    name="language"
                    value= {this.state.opts.language}
                /> */}
                <button onClick={this.convertLanguage}>Change Language{this.state.opts.language}</button>
                {/* <ToggleSwitch
                    isOn={this.state.isOnLanguageSwitch}
                    onColor="green"
                    offColor="red"
                    label="My"
                    labelStyle={{ color: 'black', fontWeight: '900' }}
                    size="medium"
                    onToggle={isOnLanguageSwitch => {
                        this.setState({ isOnLanguageSwitch: isOnLanguageSwitch });
                        // this.onToggle(isOnLanguageSwitch);
                    }}
                /> */}

                <Switch onChange={this.handleChange} checked={this.state.isOnLanguageSwitch} />

                <Form
                    onSubmit={this.handleSubmitFunction}
                    // form={this.state.form}
                    options={this.state.opts}
                    form={{
                        language: this.state.language,
                        display: this.state.display,
                        customClass: "justify-content-center",
                        components: this.state.formComponent
                    }}
                />
            </div>
        );
    }
}
export default LanguageForm;