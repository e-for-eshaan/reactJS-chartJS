import React, { useEffect, useState } from 'react'
import './Fetching.scss'
import dummydata from '../../Data/dummy.json'
import { extractDate, extractTime } from '../../Assets/Functions/Function'
const Fetching = ({ primarySetter, secondarySetter, distributionSetter, dateInput, slotInput, }) => {
    const show = true;

    const JSONdata = dummydata;
    const [modifiedData, setmodifiedData] = useState(null);
    const [primaryRefining, setprimaryRefining] = useState(null)
    const [secondaryRefining, setsecondaryRefining] = useState(null)
    const grouping1 = true
    const grouping2 = true
    const [expandingDate, setexpandingDate] = useState(null)


    useEffect(() => {
        distributionSetter(expandingDate)
    }, [expandingDate, distributionSetter])

    useEffect(() => {
    }, [expandingDate])


    useEffect(() => {
    }, [JSONdata, modifiedData, dateInput, slotInput]);


    useEffect(() => {

        const queryData = (date, slot) => {
            var tempData = null;
            if (!slot) {
                tempData = JSONdata.filter(
                    item => {
                        let date1 = new Date(item.item_date)
                        let date2 = new Date(date)
                        return +date1 === +date2;
                    }
                )
            }
            else {
                tempData = JSONdata.filter(
                    item => {
                        let date1 = new Date(item.item_date)
                        let date2 = new Date(date)
                        return +date1 === +date2 && slot === item.slot;
                    }
                )
            }

            setmodifiedData(tempData);
        }
        queryData(dateInput, slotInput);
        setexpandingDate(null)
    }, [dateInput, slotInput, JSONdata])

    useEffect(() => {
        var grouping1Data = [];

        if (modifiedData && grouping1) {
            var i = 0;

            while (i < modifiedData.length) {
                var j = i + 1;
                var temp1 = [];
                while (j < modifiedData.length && extractDate(modifiedData[i].schedule_time) === extractDate(modifiedData[j].schedule_time)) {
                    temp1.push(modifiedData[j]);
                    j++;
                }
                temp1.push(modifiedData[i]);
                grouping1Data.push(temp1);
                i = j;
            }
            setprimaryRefining(grouping1Data);
        }

    }, [grouping1, grouping2, modifiedData])

    useEffect(() => {
        if (primaryRefining && primaryRefining.length)
            setexpandingDate(extractDate(primaryRefining[primaryRefining.length - 1][0].schedule_time))
    }, [primaryRefining])


    useEffect(() => {
        var grouping2Data = [
            { time: "00:00:00", objects: [] },
            { time: "03:00:00", objects: [] },
            { time: "06:00:00", objects: [] },
            { time: "09:00:00", objects: [] },
            { time: "12:00:00", objects: [] },
            { time: "15:00:00", objects: [] },
            { time: "18:00:00", objects: [] },
            { time: "21:00:00", objects: [] },
            { time: "24:00:00", objects: [] },
        ];

        if (expandingDate && primaryRefining && primaryRefining.length) {

            var i;
            for (i = 0; i < primaryRefining.length; i++) {
                let date = extractDate(primaryRefining[i][0].schedule_time)
                if (date === expandingDate)
                    break;
            }


            let newData = primaryRefining[i];

            var j;

            for (j = 0; j < newData.length; j++) {
                let tempTime = (extractTime(newData[j].schedule_time))
                let k = 0;
                for (k = 1; k < grouping2Data.length; k++) {
                    if (tempTime >= grouping2Data[k - 1].time && tempTime < grouping2Data[k].time)
                        grouping2Data[k - 1].objects.push(newData[j])
                }
            }

            setsecondaryRefining(grouping2Data);
        }
    }, [primaryRefining, expandingDate])

    useEffect(() => {
        secondarySetter(secondaryRefining)
    }, [secondaryRefining, secondarySetter])

    useEffect(() => {
        primarySetter(primaryRefining)
    }, [primaryRefining, primarySetter])

    return (
        <div>
            {
                show && <div className='table-wrapper'>
                    <div>
                        <h2>Raw Query</h2>
                        <p>{"Raw Data Queried by date"}</p>
                        <table cellSpacing={0}>
                            {modifiedData && modifiedData.map((data, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{data.schedule_time}</td>
                                        <td>{data.slot}</td>
                                        <td>{data.item_date}</td>
                                    </tr>
                                )
                            })}
                        </table>
                    </div>

                    <div className="spacer"></div>

                    <div>
                        <h2>Primary Refining</h2>
                        <p>{"First Refining (Choose A Date)"}</p>
                        <table cellSpacing={0}>
                            {primaryRefining && primaryRefining.map((data, index) => {
                                return (
                                    <tr key={index}>
                                        <td
                                            className='datePicker'
                                            onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' });; setexpandingDate(extractDate(data[0].schedule_time)) }}
                                        >{extractDate(data[0].schedule_time)}</td>
                                        <td>
                                            <table cellSpacing={0} className='mini_table'>
                                                {
                                                    data.map((item, index) => {
                                                        return (
                                                            <tr>
                                                                <td>{item.schedule_time}</td>
                                                                <td>{item.slot}</td>
                                                                <td>{item.item_date}</td>
                                                            </tr>
                                                        )
                                                    })}
                                            </table>
                                        </td>
                                    </tr>
                                )
                            })}
                        </table>
                    </div>

                    {expandingDate && <div className="spacer spacer2"></div>}

                    {expandingDate &&
                        <div>
                            <h2>Time Distribution</h2>
                            <p>For {expandingDate}</p>
                            <table cellSpacing={0}>
                                {secondaryRefining && secondaryRefining.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                {item.time}
                                            </td>
                                            <td>
                                                {item.objects.length > 0 && <table cellSpacing={0} className='mini_table'>
                                                    {
                                                        item.objects.length > 0 && item.objects.map((none, j) => {
                                                            return (
                                                                <tr key={j}>
                                                                    <td>{none.schedule_time}</td>
                                                                    <td>{none.slot}</td>
                                                                    <td>{none.item_date}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </table>}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </table>
                        </div>}


                </div>}
        </div>
    )
}

export default Fetching