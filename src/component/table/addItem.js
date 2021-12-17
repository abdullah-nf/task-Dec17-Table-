import React, { useState } from "react";
import './table.css'


const defaultValue = { dessert: '', Calories: '', Fat: '', crabs: '', protien: '' };

const AddItem = ({ addNewItem, setOpen, enableEditing, handleUpdate, editItem }) => {
    const [add, setAdd] = useState(editItem || defaultValue)

    const validateData = () => {
        let validated = true;
        Object.keys(add).forEach(k => {
            if (add[k] === "") {
                //error
                validated = false;
            }
        });
        return validated
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateData()) {
            addNewItem(add);
        }
    }

    const handleChange = (e) => {
        const { id, value } = e.target
        setAdd(old => {
            return { ...old, [id]: value }
        })
    }


    return (
        <div className="overlay">
            <form className="form" onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder="Dessert"
                    id='dessert'
                    value={add.dessert}
                    onChange={handleChange}
                />
                <input
                    type='number'
                    placeholder="Calories"
                    id='Calories'
                    value={add.Calories}
                    onChange={handleChange}
                />
                <input
                    type='number'
                    placeholder="Fat"
                    id="Fat"
                    value={add.Fat}
                    onChange={handleChange}
                />
                <input
                    type='number'
                    placeholder="crabs"
                    id='crabs'
                    value={add.crabs}
                    onChange={handleChange}
                />
                <input
                    type='number'
                    placeholder="Protien"
                    id='protien'
                    value={add.protien}
                    onChange={handleChange}
                />
                <div className="formBtn">

                    {enableEditing ? <button className="submit" onClick={handleUpdate}>Update</button> : <button type='submit' className="submit"> Submit </button>}
                    <button type="submit" className="cancel" onClick={() => setOpen(false)} >Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default AddItem;