import React,{Component} from 'react';
import axios from 'axios';
import RecordsList from './AllRecordsList';
import {Button} from 'react-bootstrap';

export default class AllStudents extends Component{
    constructor(props){
        super(props);
        this.state={students:[]};
        this.onChangecategory = this.onChangecategory.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            category:''
        }
    }

    onChangecategory(e) {
            this.setState({
                category: e.target.category
            });
    }

    onSubmit(e) {
            e.preventDefault();//Value will be submitted through react js
            const obj = {
                category : this.state.category
            };
            axios.post("http://localhost/GBGCGCV-2.0/admin/src/components/Allstudent-details.php",obj).then(res => console.log(res.data));
            //console.log(obj);
            this.setState({
                    category: ''
                })
        }

    componentDidMount(){
        axios.get('http://localhost/GBGCGCV-2.0/admin/src/components/Allstudent-details.php')
        .then(response=>{
            this.setState({students: response.data});
        })
        .catch(function(error){
            console.log(error);
        })
    }
    StudentsList(){
        return this.state.students.map(function(object,i){
            return <RecordsList obj={object} key={i}/>;
        });
    }
    render(){
        return(
            <div>
                <form onSubmit={this.onSubmit}>
                <div className="table2">
                    <table className="table1">
                        <thead>
                        <tr>
                            <th id="row1" align="left">Degree</th>
                            <th id="row1" align="center">Branch</th>
                            <th id="row1" align="right">CGPA</th>
                        </tr>
                        <tr>
                            <td>
                                <select name="category" id="selectcolor">
                                    
                                    <option value={this.state.MBA} onChange={this.onChangecategory} >MBA</option>
                                </select>
                            </td>
                        </tr>
                        </thead>
                    </table>
                    <div className={"form-group"}>
                        <input type={"submit"} value={"Submit"} className={"btn btn-primary"}/>
                    </div>
                </div>
                </form>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First_Name</th>
                            <th>Middle_Name</th>
                            <th>Last_Name</th>
                            <th>Branch</th>
                            <th>X Marks</th>
                            <th>XII Marks</th>
                            <th>College Marks</th>
                            <th>Batch</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.StudentsList()}
                    </tbody>
                </table>
            </div>
        );
    }
}