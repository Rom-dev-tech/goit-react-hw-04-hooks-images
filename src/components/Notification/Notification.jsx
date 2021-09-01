import React from 'react';
import '../Notification/Notification.scss';

const Notification = ({ message }) => (
  <h1 className="notification__error">{message}</h1>
);

export default Notification;
