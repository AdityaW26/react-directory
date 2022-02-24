import React from "react";
import './CardStyle.css';

const ContactCard = ({fname, lname, phone, email, image}) => {
    return (
        <div className="card">
            <img className="image" src={image} alt=""/>
            <div className="innerCard">
                <ul>
                    <li className="text">First Name : {fname}</li>
                    <li className="text">Last Name : {lname}</li>
                </ul>
                <ul>
                    <li className="text">Phone : {phone}</li>
                    <li className="text">Email : {email}</li>
                </ul>
            </div>
        </div>
    );
}

export default ContactCard;