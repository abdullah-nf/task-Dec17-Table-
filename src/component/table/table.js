import React, { useEffect } from "react";
import { useState } from "react";
import './table.css'
import { AiOutlineDelete } from 'react-icons/ai';
import { GrEdit } from 'react-icons/gr';
import { RiArrowUpDownLine } from 'react-icons/ri'
import AddItem from "./addItem";
import { GetUniqueId } from "../../utils/helpers";

const detial = [{
    id: GetUniqueId(),
    dessert: "Frozen yoghurt",
    Calories: 159,
    Fat: 6,
    crabs: 24,
    protien: 4
},
{
    id: GetUniqueId(),
    dessert: "Ice Cream Sandwich",
    Calories: 237,
    Fat: 9,
    crabs: 37,
    protien: 4.3
},
{
    id: GetUniqueId(),
    dessert: "Ecliar",
    Calories: 262,
    Fat: 16,
    crabs: 24,
    protien: 6
},
{
    id: GetUniqueId(),
    dessert: "Cup Cake",
    Calories: 305,
    Fat: 3.7,
    crabs: 67,
    protien: 4.4
},
{
    id: GetUniqueId(),
    dessert: "Ginger Bread",
    Calories: 356,
    Fat: 16,
    crabs: 49,
    protien: 3.
}
];

const defaultValue = { dessert: '', Calories: '', Fat: '', crabs: '', protien: '' };

const saveList = JSON.parse(localStorage.getItem("list")) || [];

const Table = () => {
    const [isAscending, setIsAscending] = useState(true)
    const [open, setOpen] = useState(false);
    const [record, setRecord] = useState(saveList.length > 0 ? saveList : detial);
    const [editItem, setEditItem] = useState(defaultValue);

    const onSort = (sortBy) => {
        setIsAscending(!isAscending)
        const sortData = [...record].sort((a, b) => {
            if (isAscending) {
                return b[sortBy] < a[sortBy] ? 1 : -1
            }
            return a[sortBy] < b[sortBy] ? 1 : -1
        })
        setRecord(sortData)
    }

    const searchHandle = (e) => {
        const { value } = e.target;
        if (value === '') {
            return setRecord([...detial, ...saveList]);
        }
        const filter = [...record].filter((a) => {
            return Object.keys(a).some(key => a[key] && a[key].toString().toLowerCase().includes(value.toLowerCase()))
        })
        setRecord(filter)
    }

    const handleRemoveItem = (id) => {
        // setRecord(record.filter(item => item.id !== id));
        localStorage.removeItem(setRecord(record.filter(item => item.id !== id)));
    }

    const addNewItem = (item) => {
        if (item) {
            let isUpdated = false;
            const newRecords = [...record].map(r => {
                if (r.id === item.id && editItem.edit) {
                    isUpdated = true
                    setEditItem(defaultValue)
                    return item;
                }
                return r;
            })
            if (!isUpdated) {
                newRecords.push({ ...item, id: GetUniqueId() })
            }

            setRecord(newRecords || []);
            localStorage.setItem("list", JSON.stringify(newRecords || []))
        }
        setOpen(false)
    }

    useEffect(() => {
        if (editItem.dessert !== "") {
            setOpen(true)
        }
    }, [editItem])

    const handleUpdate = (e, dessert) => {
        const closestTr = e.target.closest('tr');
        console.log("==> tr : ", closestTr)
        const inputs = closestTr.getElementsByTagName('input');
        console.log("==> inputs list : ", inputs, inputs.length)
        const obj = {};
        for (let i = 0; i < inputs.length; i++) {
            const { id, value } = inputs[i];
            obj[id] = value;
        }
        setRecord(record.map(item => {
            if (item.dessert === dessert) {
                delete item.edit;
                return { ...item, ...obj }
            }
            return item;
        }))
    }

    return (<div>
        <div className="main" >
            {open && < AddItem addNewItem={addNewItem} setOpen={setOpen} handleUpdate={handleUpdate} editItem={editItem.dessert !== "" ? editItem : null} />}

            <div className="hearderRow" >
                <div >
                    <tr >
                        <th >
                            <input
                                type='text'
                                placeholder='Search'
                                onChange={searchHandle}
                                className="searchInput"
                            />
                        </th>
                    </tr>
                </div>
                <div>
                    <tr>
                        <th>
                            <button
                                onClick={() => setOpen(true)}
                                className="addBtn"
                            >
                                ADD
                            </button>
                        </th>
                    </tr>
                </div>

            </div>
            <table className="table" >
                <thead className="thead" >

                    <tr>
                        <th className="dessert"> Dessert(100 gm serving) <RiArrowUpDownLine className="filter" onClick={() => onSort("dessert")} /> </th>
                        <th className="headEnteries"> Calories <RiArrowUpDownLine className="filter" onClick={() => onSort("Calories")} /> </th>
                        <th className="headEnteries"> Fat(g) <RiArrowUpDownLine className="filter" onClick={() => onSort("Fat")} />
                        </th>
                        <th className="headEnteries"> Carbs(g) <RiArrowUpDownLine className="filter" onClick={() => onSort("crabs")} />
                        </th>
                        <th className="headEnteries"> Protien(g) <RiArrowUpDownLine className="filter" onClick={() => onSort("protien")} /> </th>
                        <th className="headEnteries" > Action </th> </tr >
                </thead>
                {record && record.length === 0 && <tbody className="thead" >
                    <tr >
                        <td colSpan={8}
                            align="center" > No records found
                        </td>
                    </tr >
                </tbody>}

                {
                    record && record.map((obj, id) => {
                        return (
                            <tbody className="thead"
                                key={id} >
                                <tr>
                                    <td> {
                                        obj.dessert
                                    } </td>


                                    <td className="entries" > {
                                        obj.Calories
                                    } </td>

                                    <td className="entries" > {
                                        obj.Fat
                                    } </td>

                                    <td className="entries" > {
                                        obj.crabs
                                    } </td>

                                    <td className="entries" > {
                                        obj.protien
                                    } </td>

                                    <td className="icons" >
                                        <AiOutlineDelete className="delete"
                                            onClick={() => { handleRemoveItem(obj.id) }}
                                        />
                                        <GrEdit className="edit" onClick={() => setEditItem({ ...editItem, ...obj, edit: true })} />
                                    </td>
                                </tr>
                            </tbody>
                        );
                    })
                }



            </table>
        </div >
    </div >
    );
}
export default Table;