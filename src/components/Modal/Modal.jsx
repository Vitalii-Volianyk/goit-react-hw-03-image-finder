import { Component } from 'react';
import css from './Modal.module.css';
const port = document.querySelector('#modal-portal');
class Modal extends Component {
  render() {
    return (
      <div className="overlay">
        <div className="modal">
          <img src="" alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
