import React from 'react';
import { Alert } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";

const StatusForm = (props) => {
    return props.isLoaded && Object.keys(props.validateErrors).length === 0 && !props.isSave
        ? <Alert color="primary">Загружено</Alert>
        : props.isSubmit && Object.keys(props.validateErrors).length > 0 && !props.isSave
            ? <Alert color="danger">Валидация не пройдена</Alert>
            : <Alert >Сохранено</Alert>
}

export default StatusForm;
