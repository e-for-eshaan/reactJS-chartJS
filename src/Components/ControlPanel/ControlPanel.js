import React, { useEffect, useState } from 'react'
import './ControlPanel.scss'
const ControlPanel = (props) => {

    function myFunction() {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    const [date, setDate] = useState('2021-05-29');
    const [slot, setslot] = useState(null)

    useEffect(() => {
        props.dateSetter(date)
        props.slotSetter(slot)
    }, [date, slot])

    useEffect(() => {
        let dateInputField = document.querySelector('input');
        if (dateInputField)
            dateInputField.value = '2021-05-28';
    }, [])


    window.onclick = function (event) {
        if (!event.target.matches('.dropbtn')) {
            let dropdowns = document.getElementsByClassName("dropdown-content");
            let i;
            for (i = 0; i < dropdowns.length; i++) {
                let openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }


    return (
        <div className='controlWrapper'>
            <h3>
                Control Panel
            </h3>
            <div className='controls'>
                <input type="date" onChange={(e) => { setDate(e.target.value) }} />

                <div class="dropdown">
                    <button onClick={() => myFunction()} class="dropbtn">
                        {(slot === null ? 'Slot' : (slot === 'L' ? 'Lunch' : 'Dinner')) + ' ↓'}
                    </button>
                    <div id="myDropdown" class="dropdown-content">
                        <a onClick={() => { setslot(null) }}>All</a>
                        <a onClick={() => { setslot('L') }}>Lunch</a>
                        <a onClick={() => { setslot('D') }}>Dinner</a>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ControlPanel