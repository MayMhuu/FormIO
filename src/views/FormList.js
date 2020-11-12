import React, { Component } from 'react';
import { Route, Link, BrowserRouter, Switch, Router, withRouter } from 'react-router-dom'
import configs from '../configs'
import '../scss/_builderStyles.scss';

export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            listUni: [],
            activeIndex: null,
            show: false,
            formList: [],
            universityId: '',
            formId: ''
        }
        this.getUniversityList = this.getUniversityList.bind(this)
        this.getFormList = this.getFormList.bind(this)
    }

    componentDidMount() {
        var id = this.props.match.params.universityId;
        var name = this.props.match.params.universityName;
        this.setState({ universityId: id });
        console.log("universityId, name", id + name)

        this.getFormList();
    }

    getUniversityList = () => {

        const requestOptions = {
            method: 'Post',
            mode: 'no-cors',
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer b89f1c62-fed9-440f-8a23-a1bf07b338a9'
            },
            body: JSON.stringify({
                search: ''
            })
        };
        let url = `${configs.constant.HOST_NAME}`;
        fetch(url + 'api/university/getList', requestOptions)
            // .then((response) => {
            //   if (response.err === 200) {
            //     console.log("SUCCESSS")
            //      return response.json();
            //   // this.setState({ listUni: response.data })
            //   } else {
            //     console.log("SOMETHING WENT WRONG",response)
            //   }
            // })
            .then(response => {
                console.log("SUCCESSS", JSON.stringify(response))
            }
            )
            .catch(error => console.log("Error Message", error.message))

        console.log('Lsit data', this.state.listUni)
    }

    getFormList = () => {

        var universityId = this.props.match.params.universityId;

        console.log("Request UNI ID", universityId)

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                universityId: universityId
            })
        };

        let url = `${configs.constant.HOST_NAME}`;
        fetch(url + 'api/university/forms/getFormList', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ formList: data.data }));

        console.log("Form List", this.state.formList)

    }

    handleCheck(id) {
        console.log("UniversityId", id)
    }

    deleteForm(formId) {
        // var formId = this.state.formId;
        console.log("Delete", formId);

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                formId: formId
            })
        };

        let url = `${configs.constant.HOST_NAME}`;
        fetch(url + 'admin/university/forms/deleteForm', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.err === 200) {
                    // console.log("Success", data)
                    this.getFormList();
                }
                else {
                    console.log("Error", data)
                }
            }
            );
    }

    render() {
        let formList = this.state.formList
        var name = this.props.match.params.universityName;
        var id = this.props.match.params.universityId;

        // console.log("list", this.state.formList)
        if (formList.length > 0) {

            return (
                <div>
                    <div className="main">
                        <div class="row">
                            <div class="col-lg-12">

                            </div>
                        </div>
                        <div class="row overview">
                            <div class="col-md-1"></div>
                            <div class="col-md-10">
                                <div class="row formList">
                                    <div class="col-md-6">
                                        <h3 class="universityHeader" style={{ marginLeft: "20px" }}>{name} </h3>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="button button1" style={{ marginLeft: "20px" }}>
                                            {/* <Link to="/create/" class="customLink" style={{ textDecoration: 'none' }} ><i class="fa fa-plus-square" aria-hidden="true"></i>&nbsp;New Form</Link> */}
                                            <Link to={{
                                                pathname: `/create/${id}/${name}`,
                                                query: { universityName: name }
                                            }}
                                                class="customLink" style={{ textDecoration: 'none' }} >
                                                <i class="fa fa-plus-square" style={{ color: 'white' }} aria-hidden="true">
                                                    &nbsp;New Form
                                                </i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div >
                                    {
                                        this.state.formList.map((value, index) => {
                                            return (
                                                <div class="list-group-item " key={index}>
                                                    <div class="row">
                                                        <div class="col-md-2">
                                                            {/* <strong>{value.id}</strong> */}
                                                            {/* <img src={value.logo} alt="Logo" width="40px" /> */}
                                                            <i class="fa fa-wpforms fa-2x" ></i>
                                                        </div>
                                                        <div class="col-md-4">
                                                            <strong class="universityName">{value.formName}</strong>
                                                        </div>
                                                        <div class="col-md-6">

                                                            <div class="f_button f_button1" >
                                                                <Link to={{
                                                                    pathname: `/form/${value.formId}`
                                                                }}
                                                                    class="customLink" style={{ textDecoration: 'none' }} >
                                                                    <i class="fa fa-eye" style={{ color: 'white' }} aria-hidden="true">
                                                                        &nbsp; View Form</i>

                                                                </Link>
                                                            </div>
                                                            <div class="f_button f_button1" >
                                                                <Link to={{
                                                                    pathname: `/update/${value.formId}/${value.formName}`,
                                                                    query: {universityID: id }
                                                                }}
                                                                    class="customLink" style={{ textDecoration: 'none' }} >
                                                                    <i class="fa fa-edit" style={{ color: 'white' }} aria-hidden="true">
                                                                        &nbsp; Edit Form</i>

                                                                </Link>

                                                                {/* <Link to="/search?q=react" class="customLink" style={{ textDecoration: 'none' }} >
                                                                    <i class="fa fa-edit" style={{ color: 'white' }} aria-hidden="true">
                                                                        &nbsp; Edit Form</i>
                                                                </Link> */}

                                                            </div>

                                                            <button class="f_button f_button1" onClick={() => {
                                                                //   this.setState({ formId: value.formId });
                                                                this.deleteForm(value.formId);
                                                            }}>
                                                                <i class="fa fa-trash" aria-hidden="true"></i>
                                                            </button>

                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div class="col-md-1"></div>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <div className="App">
                        <div class="row overview">
                            <div class="col-md-3"></div>
                            <div class="col-md-6">
                                <div class="row formList">
                                    <div class="col-md-6">
                                        <h3 class="universityHeader" style={{ marginLeft: "20px" }}>{name} </h3>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="button button1" style={{ marginLeft: "20px" }}>
                                            {/* <Link to="/create/" class="customLink" style={{ textDecoration: 'none' }} ><i class="fa fa-plus-square" aria-hidden="true"></i>&nbsp;New Form</Link> */}
                                            <Link to={{
                                                pathname: `/create/${id}/${name}`,
                                                query: { universityName: name }
                                            }}
                                                class="customLink" style={{ textDecoration: 'none' }} >
                                                <i class="fa fa-plus-square" style={{ color: 'white' }} aria-hidden="true">&nbsp;New Form</i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

