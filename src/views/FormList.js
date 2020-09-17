import React, { Component } from 'react';
import { connect } from 'react-redux';
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
        //  let formList = this.state.formList;
        //  let formList1 = this.state.formList1;

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

        fetch('https://dev-moe-api.ayainnovation.com/api/university/getList', requestOptions)
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
        //  .then(data => this.setState({ listUni: data.data }));

        // let listUni1 = [
        //   {
        //     "id": "5f449786e9a1061265d2b300",
        //     "name": "Yangon University of Test 300",
        //     "logo": "https://test-databases-ayaplus.s3.amazonaws.com/Uploads/ba0e3506-7de4-4e7a-9f49-a52fceb976b3",
        //   },
        //   {
        //     "id": "5f449748e9a1061265d2b2fd",
        //     "name": "Yangon University of Economics",
        //     "logo": "https://test-databases-ayaplus.s3.amazonaws.com/Uploads/ba0e3506-7de4-4e7a-9f49-a52fceb976b3",
        //   },
        //   {
        //     "id": "5f449759e9a1061265d2b2fe",
        //     "name": "Yangon University of Computer Studies",
        //     "logo": "https://test-databases-ayaplus.s3.amazonaws.com/Uploads/ba0e3506-7de4-4e7a-9f49-a52fceb976b3",
        //   }
        // ]

        // this.setState({ listUni: listUni1 })

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
                                                        <div class="col-md-4">
                                                            <div class="f_button f_button1" >
                                                                <Link to={{
                                                                    pathname: `/update/${value.formId}/${value.formName}`,
                                                                    query: { formName: value.formName }
                                                                }}
                                                                    class="customLink" style={{ textDecoration: 'none' }} >
                                                                    <i class="fa fa-edit" style={{ color: 'white' }} aria-hidden="true">
                                                                    &nbsp; Edit Form</i>
                                                                    {/* <p class="btn_text">Edit Form</p> */}
                                                                </Link>
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

