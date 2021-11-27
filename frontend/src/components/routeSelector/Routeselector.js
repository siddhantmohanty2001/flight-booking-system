import React, { useState,useRef } from 'react'
import moment from "moment";
import './Routeselector.css'
import * as apiCall from './routeApifunc'
import BusList from '../BusList/BusList'
export default function Routeselector({changeRoute}) {

    const [dataInp, setData] = useState("")
    const [startCity, setStartCity] = useState('')
    const [destination, setDestination] = useState('')
    const [date,setDate] = useState('');
    const handleToCity = e => {
        e.preventDefault()
        setDestination({ destination: e.target.value })
        localStorage.setItem("destination", e.target.value)
    }
    const renderBusList = (dataInp) => {
        if (Object.keys(dataInp).length > 0) {
            return (<BusList changeRoute = {changeRoute} value={dataInp} />)
        }
    }
    const handleFromCity = e => {
        e.preventDefault()
        setStartCity({ startCity: e.target.value })
        localStorage.setItem("start", e.target.value)
        // console.log(startCity)
    }

    const getRoutes = e => {
        e.preventDefault()
        // console.log(startCity,destination)
        apiCall.getRoutesFromApi(startCity.startCity, destination.destination, date.date)
            .then(response => response.data)
            .then(data => {
                setData(data.bus)
            })
    }

    const handleDate = e => {
        e.preventDefault()
        //    console.log(e.target.value)
        // const d = e.target.value;
        // moment(d).format('DD/MM/YYYY');
        // console.log(d); 
        console.log(e.target.value)
        localStorage.setItem("date", e.target.value)
        setDate({date : e.target.value})
    }
    
    return (
        <div className="rdc">
            <div className="form-group inline"></div>
            <div className="main-container">
                <form className="form-inline" onSubmit={e => getRoutes(e)}>
                    <select name="ad_account_selected" data-style="btn-new" class="selectpicker" onChange={e => { handleFromCity(e) }}>
                        <option>FROM</option>
                        <option>Chennai</option>
                        <option>Bangalore</option>
                    </select>
                    <select name="ad_account_selected" data-style="btn-new" class="selectpicker" onChange={e => { handleToCity(e) }}>
                        <option>TO</option>
                        <option>Hyderabad</option>
                        <option>Coimbatore</option>
                        <option>Vishakapatnam</option>
                        <option>Bangalore</option>
                        <option>Chenai</option>
                    </select>
                    <input onChange={e => { handleDate(e) }} type="date"></input>
                    <input type="submit" className=" btn btn-primary btn-md getRoute" />
                </form>

                <div>
                    {renderBusList(dataInp)}
                </div>
            </div>
        </div>
    )
}
