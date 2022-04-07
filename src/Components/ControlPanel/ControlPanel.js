import React, { useEffect, useState } from 'react'
import './ControlPanel.scss'
const ControlPanel = (props) => {

    const [beforeAfter, setRange] = useState("Range")

    function myFunction() {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    const [date, setDate] = useState(null);
    const [slot, setslot] = useState(null)

    useEffect(() => {
        props.dateSetter(date)
        props.slotSetter(slot)
    }, [date, slot])

    window.onclick = function (event) {
        if (!event.target.matches('.dropbtn')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }


    return (
        <div>
            <h3>
                Control Panel
            </h3>
            <div className='controls'>

                <div class="dropdown">
                    <button onClick={() => myFunction()} class="dropbtn">
                        {'Slot'}
                    </button>
                    <div id="myDropdown" class="dropdown-content">
                        <a onClick={() => { setslot(null) }}>All</a>
                        <a onClick={() => { setslot('L') }}>Lunch</a>
                        <a onClick={() => { setslot('D') }}>Dinner</a>
                    </div>
                </div>

                <input type="date" onChange={(e) => { setDate(e.target.value) }} />
            </div>
        </div>
    )
}

export default ControlPanel