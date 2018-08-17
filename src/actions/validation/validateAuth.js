import React from 'react';
import Error401 from '../../views/error/Error401';

export function validateAuth() {
    return (
        !localStorage.getItem('user') ?
        <Error401/> : ''
    )
}