import React, { useEffect, useState } from 'react'
import './Fetching.scss'
import dummydata from '../../Data/dummy.json'
import { extractDate, extractTime } from '../../Assets/Functions/Function'
const Fetching = (props) => {
    const show = true;

    const [JSONdata, setJSONdata] = useState(dummydata);
    const [modifiedData, setmodifiedData] = useState(null);
    const [grouping1, setgrouping1] = useState(true);
    const [grouping2, setgrouping2] = useState(true);
    const [primaryRefining, setprimaryRefining] = useState(null)
    const [secondaryRefining, setsecondaryRefining] = useState(null)

    const [expandingDate, setexpandingDate] = useState(null)

    useEffect(() => {
        console.log(expandingDate)
    }, [expandingDate])


    useEffect(() => {
        console.log({ modifiedData: modifiedData })
    }, [JSONdata, modifiedData, props.dateInput, props.slotInput]);


    const queryData = (date, slot) => {
        var tempData = null;
        if (!slot) {
            tempData = JSONdata.filter(
                item => {
                    let date1 = new Date(item.item_date)
                    let date2 = new Date(date)
                    return +date1 == +date2;
                }
            )
        }
        else {
            tempData = JSONdata.filter(
                item => {
                    let date1 = new Date(item.item_date)
                    let date2 = new Date(date)
                    return +date1 == +date2 && slot == item.slot;
                }
            )
        }

        setmodifiedData(tempData);
    }

    useEffect(() => {
        queryData(props.dateInput, props.slotInput);
        setexpandingDate(null)
    }, [props.dateInput, props.slotInput])

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
            console.log({ grouping1: grouping1Data });
            setprimaryRefining(grouping1Data);
        }

    }, [grouping1, grouping2, modifiedData])

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
                console.log({ date: date })
                if (date == expandingDate)
                    break;
            }

            console.log({ refined: primaryRefining[i] })

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

            // var j
            // for (j = 0; j < primaryRefining[i].length; i++) {
            //     console.log(primaryRefining[i][j])
            // }

            setsecondaryRefining(grouping2Data);
            console.log({ grouping2: grouping2Data });
        }
    }, [primaryRefining, expandingDate])

    useEffect(() => {
        props.secondarySetter(secondaryRefining)
    }, [secondaryRefining])

    useEffect(() => {
        props.primarySetter(primaryRefining)
    }, [primaryRefining])

    return (
        <div>
            {
                show && <div className='table-wrapper'>
                    <div>
                        <h2>Raw Query</h2>
                        <p>{"Raw Data Queried by date"}</p>
                        <table>
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
                        <table>
                            {primaryRefining && primaryRefining.map((data, index) => {
                                return (
                                    <tr key={index}>
                                        <td
                                            className='datePicker'
                                            onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' });; setexpandingDate(extractDate(data[0].schedule_time)) }}
                                        >{extractDate(data[0].schedule_time)}</td>
                                        <td>
                                            {data.map((item, index) => {
                                                return <table>
                                                    <tr>
                                                        <td>{item.schedule_time}</td>
                                                        <td>{item.slot}</td>
                                                        <td>{item.item_date}</td>
                                                    </tr>
                                                    <br />
                                                </table>
                                            })}
                                        </td>
                                    </tr>
                                )
                            })}
                        </table>
                    </div>

                    <div className="spacer"></div>

                    {expandingDate &&
                        <div>
                            <h2>Time Distribution</h2>
                            <p>For {expandingDate}</p>
                            <table>
                                {secondaryRefining && secondaryRefining.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>
                                                {item.time}
                                            </td>
                                            <td>
                                                {
                                                    item.objects.length > 0 && item.objects.map((none, j) => {
                                                        return (
                                                            <table>
                                                                <tr>
                                                                    <td>{none.schedule_time}</td>
                                                                    <td>{none.slot}</td>
                                                                    <td>{none.item_date}</td>
                                                                </tr>
                                                            </table>
                                                        )
                                                    })
                                                }
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