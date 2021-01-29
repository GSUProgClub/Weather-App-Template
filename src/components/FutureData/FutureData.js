import React from 'react';
import {DataGrid} from '@material-ui/data-grid';

const columns = [
    {field: 'date', headerName: 'Date', width: 120},
    {field: 'day', headerName: 'Temperature', width: 70},
    {field: 'min', headerName: 'Minimum', width: 70},
    {field: 'max', headerName: 'Maximum', width: 70},
    {field: 'feels_like', headerName: 'Feels Like', width: 70},
    ];

const FutureData = (props) => {
    function generateRows(daily) {
        let cleanData = 
        return cleanData;
    }

    return (
        <div style={{height: 400, width: '100%'}}>
            <DataGrid rows={generateRows(props.responseObj.daily)} columns={columns} pageSize={10}/>
        </div>
    )
}

export default FutureData;