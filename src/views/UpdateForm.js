import React from "react";
import ReactDOM from "react-dom";
import { FormBuilder } from "react-formio";
import createForm from '../createForm.json';
import configs from '../configs'
import ReactLoading from 'react-loading';

class UpdateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      form: null,
      formComponent: null,
      componentsState: [],
      updateSchema: null,
      formId: '',
      formName: '',
      value: 'form',
      display:'form',
    };
    this.getFormComponents = this.getFormComponents.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {

    var id = this.props.match.params.formId;
    var name = this.props.match.params.formName;

    this.setState({ formId: id })
    this.setState({ formName: name })

    console.log("Form", id);
    this.getFormComponents(id)
  }

  handleChange(event) {
    this.setState({ formName: event.target.value });

    console.log("Form Name", this.state.formName)
  }

  onChange(event) {
    this.setState({ displayType: event.target.value });

    console.log("Form Name", this.state.displayType)
  }

  onFormSubmit(event) {

    console.log('onFormSubmit', this.state.formName)
    event.preventDefault();

  };

  getFormComponents = (id) => {

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        formId: id
      })
    };

    let url = `${configs.constant.HOST_NAME}`;
    fetch(url + 'api/university/forms/getComponents', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.err === 200) {
          this.setState({ componentsState: data.data.components, displayType:data.data.displayType })
        }
        else {
          console.log("Error", data)
        }
      }
      );

  }

  updateForm = () => {

    var fName = this.state.formName;
    var formId = this.state.formId;
    var displayType = this.state.displayType;
    
    if (fName == '') {
      alert("Form Name can not be null")
    }

    console.log("Name", this.state.formName)

    let updateComponent = this.state.updateSchema;
    console.log("Update Component", JSON.stringify(updateComponent));

    const requestOptions = {

      method: 'POST',
      body: JSON.stringify({
        formId: formId,
        formName: fName,
        displayType:displayType,
        components: updateComponent
      })
    };
    let url = `${configs.constant.HOST_NAME}`;
    fetch(url + 'admin/university/forms/updateForm', requestOptions)
      .then(response => response.json())
      // .then(data => console.log("Response", data));
      .then(data => {
        if (data.err === 200) {
          //console.log("Success", data)
          this.props.history.goBack();
        }
        else {
          // console.log("Error", data)
          alert("Error : Please try again")
        }
      }
      );
  }

  render() {
    let formList = this.state.componentsState
    return (
      <div>
        <div className="App">
          <div class="row" style={{ paddingTop: '15px', paddingBottom: '10px' }}>
            <div class="col-md-2" ></div>
            <div class="col-md-9" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
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
                  <select class="select_custom" value={this.state.displayType} onChange={this.onChange}>
                    <option value="form">Form</option>
                    <option value="wizard">Wizard</option>
                  </select>
                </div>
                <div class="col-md-4">
                  <button class="f_button f_button1" onClick={this.updateForm}>
                    Update Form
                  </button>

                  <div class="col-md-2" >
                  </div>
                </div>

              </div>
              <div class="col-md-2" ></div>
            </div>
            <div class="row" style={{ paddingTop: '15px', paddingBottom: '10px', width: '100%' }}>
            </div>
          </div>
          <div class="row" style={{ paddingTop: '15px', paddingBottom: '10px', width: '100%' }}>
            <div class="col-md-1" ></div>
            <div class="col-md-10">
              <FormBuilder
                form={{
                  display: this.state.displayType,
                  components: this.state.componentsState.components
                }}
                onChange={schema => {
                  this.setState({ updateSchema: schema })
                  console.log("Update Component", JSON.stringify(schema));
                }}
              />
            </div>
            <div class="col-md-1" ></div>
          </div>
        </div>
      </div >

      //Custom Form
      // <FormBuilder
      //   form={{ display: 'form' }}
      //   onChange={schema => console.log("Schema", JSON.stringify(schema))}
      //   options={{
      //     builder: {
      //       layout: false,
      //       premium: false,
      //       basic: {
      //         default: true,
      //         components: {
      //           password: false,
      //           radio: false,
      //           button: false,
      //         },
      //       },
      //       advanced: {
      //         default: true,
      //         components: {
      //           signature: false,
      //         },
      //       },
      //     },
      //   }}
      // />
    )
  }
}

export default UpdateForm