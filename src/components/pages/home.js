import * as React from 'react';
import Header from '../common/Header';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeItems } from '../store/actions/product';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { sortName, sortPrice } from '../store/actions/filters';


export default function Home() {
    const [sort, setSort] = React.useState('');
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log("state => ", state);

    const handleChange = (event) => {
        if (event.target.value == "name") {
            dispatch(sortName());
            setSort(event.target.value);
        } else {
            dispatch(sortPrice())
            setSort(event.target.value);
        }
    };

    return (
        <>
            <Header />
            <div className="topfilters">
                <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    options={state.products.products.map(items => items.name)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search input"
                            InputProps={{
                                ...params.InputProps,
                                type: 'search',
                            }}
                        />
                    )}
                />
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={sort}
                            label="Sort"
                            onChange={handleChange}
                        >
                            <MenuItem value="name">Name</MenuItem>
                            <MenuItem value="price">Price</MenuItem>
                            
                        </Select>
                    </FormControl>
                </Box>
            </div>
            <div className='productlist'>
                {state.products.products.map((items, index) => (
                    <Card key={index} sx={{ maxWidth: 345 }}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {items.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {items.discription}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Category : {items.category}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Price : {items.sellprice} Rs
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Discount : {items.discount}%
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Final Price : {items.finalprice} Rs
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                You save : {items.discountedsellprice} Rs
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => dispatch(removeItems(items))}>Delete</Button>
                            <Button size="small" onClick={() => navigate('/editproduct', { state: items })}>Edit</Button>
                        </CardActions>
                    </Card>
                ))}
            </div>
        </>
    )
}
