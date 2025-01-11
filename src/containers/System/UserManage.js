import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./UserManage.scss";
import { getAllUsers } from '../../services/userService';

class UserManage extends Component {

    /*
        life cycle (Vòng đời / Luồng)
        Khi ta run 1 component:
            1: run constructor -> init state
            2: Did mount (Gán giá trị cho 1 biến nào đấy thì dùng hàm này) / (set state)
            3: Render

    */

    // Khoi tao cac bien trong day
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: []
        }
    }

    async componentDidMount() {
        let response = await getAllUsers('ALL');
        // console.log("Response: ", response)
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            }, () => {
                // console.log("Check user: ", this.state.users)
            })
        }
        // console.log("Check user 1: ", this.state.users)
        // console.log("OK")
        // console.log("Response: ", response)
    }

    render() {
        let arrUsers = this.state.arrUsers;

        return (
            <>
                <div className="title text-center">Manage users with Chi Nguyen</div>
                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead>
                            <tr className='UserManager_thead text-center'>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>address</th>
                                <th>Phone</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrUsers && arrUsers.map((item, index) => {
                                return (
                                    <>
                                        <tr className='text-left body_content'>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>{item.phoneNumber}</td>
                                            <td className='action'>
                                                <button className='btn'>
                                                    <i class="col-yel fa-regular fa-pen-to-square"></i>
                                                </button>
                                                <button className='btn'>
                                                    <i class="co-red fa-solid fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
