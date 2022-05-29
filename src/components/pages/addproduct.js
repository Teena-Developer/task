import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Header from '../common/Header';
import { useNavigate } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addItems } from '../store/actions/product';


export default function Addproduct() {
    const [value, setValue] = React.useState(new Date());
    const [expdate, setExpdate] = React.useState("");
    const [inputs, setInputs] = React.useState({});
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    console.log("state => ",state);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if (name == "discount" && value !== "") {
            if (inputs.sellprice !== "" || inputs.sellprice !== undefined) {
                setInputs(values => ({ ...values, ["discountedsellprice"]: inputs.sellprice * (value / 100) }));
                setInputs(values => ({ ...values, ["finalprice"]: inputs.sellprice - (inputs.sellprice * (value / 100)) }));
                           
            };
        };
        setInputs(values => ({ ...values, [name]: value }));
        setInputs(values => ({ ...values, ["id"]: Math.floor(100000 + Math.random() * 900000) }));     
        console.log("name => ", name, "   value => ", value);
    }

    const validate = (event) => {
        event.preventDefault();
        if (inputs.name == "" || inputs.name == undefined) {
            toast.error("Please enter product name.");
        } else if (inputs.category == "" || inputs.category == undefined) {
            toast.error("Please select category.");
        } else if (inputs.discription == "" || inputs.discription == undefined) {
            toast.error("Please enter discription.");
        } else if (expdate == "") {
            toast.error("Please select expiry date.");
        } else if (inputs.costprice == "" || inputs.costprice == undefined) {
            toast.error("Please enter cost price.");
        } else if (inputs.sellprice == "" || inputs.sellprice == undefined) {
            toast.error("Please enter sell price.");
        } else if (inputs.discount == "" || inputs.discount == undefined) {
            toast.error("Please enter discount.");
        } else {
            console.log("inputs => ", inputs);
            dispatch(addItems(inputs));
            toast.success("Success! Your product added successful!");
        };
    };

    const setexpirydate = (date) => {
        const day = date.toLocaleString('default', { day: '2-digit' });
        const month = date.toLocaleString('default', { month: '2-digit' });
        const year = date.toLocaleString('default', { year: 'numeric' });
        setValue(date);
        setInputs(values => ({ ...values, ["expirydate"]: day + "/" + month + "/" + year }));
        setExpdate(day + "/" + month + "/" + year);
    };


    return (
        <div className='main'>
            <Header />
            <div className='info'>
                <div className='heading'><h1>Add Product</h1></div>
                <div className='formfields'>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1 },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <FormControl variant="standard">
                            <TextField
                                required
                                id="standard-required"
                                label="Name"
                                name="name"
                                value={inputs.name || ""}
                                variant="standard"
                                onChange={handleChange}
                            />
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={inputs.category || ""}
                                    label="Category"
                                    name='category'
                                    onChange={handleChange}
                                >
                                    <MenuItem value="Fashion">Fashion</MenuItem>
                                    <MenuItem value="Mobile & Accessories">Mobile & Accessories</MenuItem>
                                    <MenuItem value="Grocery">Grocery</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                required
                                id="standard-required"
                                label="Discription"
                                name="discription"
                                variant="standard"
                                value={inputs.discription || ""}
                                onChange={handleChange}
                            />
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    renderInput={(props) => <TextField {...props} />}
                                    label="Expiry Date"
                                    value={value}
                                    onChange={setexpirydate}
                                />
                            </LocalizationProvider>
                            <TextField
                                id="standard-number"
                                label="Cost Price"
                                type="number"
                                name='costprice'
                                value={inputs.costprice || ""}
                                onChange={handleChange}
                                variant="standard"
                                InputProps={{ inputProps: { min: 0 } }}
                            />
                            <TextField
                                id="standard-number"
                                label="Sell Price"
                                type="number"
                                name='sellprice'
                                value={inputs.sellprice || ""}
                                onChange={handleChange}
                                variant="standard"
                                InputProps={{ inputProps: { min: 0 } }}
                            />
                            <TextField
                                id="standard-number"
                                label="Discount in %"
                                type="number"
                                name='discount'
                                value={inputs.discount || ""}
                                onChange={handleChange}
                                variant="standard"
                                InputProps={{ inputProps: { min: 0, max: 100 } }}
                            />
                            <TextField
                                id="standard-read-only-input"
                                label="Discounted Sell Price(Saving)"
                                value={(inputs.sellprice * (inputs.discount / 100)) || ""}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="standard"
                            />
                            <TextField
                                id="standard-read-only-input"
                                label="Final Price"
                                value={(inputs.sellprice - (inputs.sellprice * (inputs.discount / 100))) || ""}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="standard"
                            />
                            <Button variant="contained" onClick={validate}>Submit</Button>
                        </FormControl>
                    </Box>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}
