import React, {Component} from 'react'
import './Layout.css'
import { Navbar } from '../../components/Navbar/Navbar';
import { Alert } from '../../components/Alert/Alert';
import Modal from '../../components/UI/Modal/Modal'
import { TaskList } from '../../components/TaskLIst/TaskList';
import {TaskForm} from '../../components/TaskForm/TaskForm'

class Layout extends Component {

    state = {
        modal: false,
        editTaskId: null,
        hideNav: 0
    }

    modalHundler = taskId => {
        console.log("Закрытие окна")
        this.setState({
            ...this.state,
            modal: !this.state.modal,
            editTaskId: taskId
        })
    }

    componentDidMount() {
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }
    
    resize() {
        let currentHideNav = (window.innerWidth <= 992); // 768
        if (currentHideNav !== this.state.hideNav) {
            this.setState({...this.state, hideNav: currentHideNav});
        }
    }

    render() {
       return (
           <div className="Layout container">
               <header>
                    <div className="header">
                            <h1>Раздел задач</h1>
                        </div>
                        <Navbar 
                            modalHandler={this.modalHundler}
                        />
               </header>
               <main>
                    <Alert/>
                    <TaskList modalHandler={this.modalHundler}/>
               </main>
               <Modal 
                    isOpen={this.state.modal}
                    onClose={this.modalHundler}
                    header={(this.state.editTaskId !== null ? 'Редактирование' : 'Создание') + ' задачи'}
                >
                    <TaskForm taskId = {this.state.editTaskId}/>
                </Modal>

           </div>
       )
    }
}

export default Layout