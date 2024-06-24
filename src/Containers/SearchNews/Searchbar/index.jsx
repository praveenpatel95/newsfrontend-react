import {Box, FormControl, FormHelperText,
    Grid, InputAdornment, InputLabel, Select,
    TextField
} from "@mui/material";
import Container from "@mui/material/Container";
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useValidator from "../../../utils/useValidator";
import * as Yup from 'yup';
import {useNavigate} from "react-router";
import CustomDatePicker from "../../../Components/CustomDatePicker";
import React, {useEffect, useState} from "react";
import { categories } from '../../../constant/newsApiConstant';
import {getNewsAPIArticles} from "../../../stores/NewsApi/actions";
import {useDispatch} from "react-redux";

function Searchbar({page}) {

    const pageSize = 12;
    const dispatch = useDispatch();
    const onSubmit = () => {
        searchArticles();
    }
    const searchArticles = () => {
        let url = `source=${encodeURIComponent(values?.source)}&keyword=${encodeURIComponent(values?.keyword)}&category=${encodeURIComponent(values?.category ?? '')}&pageSize=${pageSize}&page=${page}`;
        if (values?.dateFrom && values?.dateTo) {
            let date1 = new Date(values.dateFrom)
            let dateFrom = date1.getDate() + '-' + (date1.getMonth() + 1) + '-' + date1.getFullYear()

            let date2 = new Date(values.dateTo)
            let dateTo = date2.getDate() + '-' + (date2.getMonth() + 1) + '-' + date2.getFullYear()

            url += `&fromDate=${dateFrom}&toDate=${dateTo}`;
        }
        dispatch(getNewsAPIArticles(url));
    }

    const {
        values,
        setValues,
        touched,
        errors,
        handleSubmit,
    } = useValidator({
        initialValues: {
            keyword: '',
            source: '',
            dateFrom: '',
            dateTo: '',
            category: '',
        },
        validationSchema: Yup.object().shape({
            keyword: Yup.string().required('Enter a keyword.'),
            source: Yup.string().required('Select Source.'),
        }),
        onSubmit,
    });

    useEffect(() => {
        if(page && values?.source){
            searchArticles();
        }
    }, [page, values?.source]);

    return (
        <>
            <Container sx={{my: 2}}>
                <Box sx={{flexGrow: 1, px: 5}}>
                    <Grid item sm={12} sx={{pb: 1}}>
                        <Typography component="h2" variant="h4">
                            Search article
                        </Typography>
                    </Grid>
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={2}>

                            <Grid item xs={12} sm={4}>
                                <TextField
                                    fullWidth
                                    placeholder="Enter a keyword for search article"
                                    value={values.keyword}
                                    onChange={(e) => setValues({...values, keyword: e.target.value})}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon/>
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="outlined"
                                    required
                                />
                                {touched?.keyword && errors?.keyword ? (
                                    <FormHelperText error>{errors?.keyword}</FormHelperText>
                                ) : (
                                    ''
                                )}
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Source</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Select Source"
                                        value={values.source}
                                        onChange={(e) => setValues({...values, source: e.target.value})}
                                    >
                                        <MenuItem value='newsapi'>News API</MenuItem>
                                        <MenuItem value='theguardian'>The Guardian</MenuItem>
                                        <MenuItem value='nyt'>New York Times</MenuItem>
                                    </Select>
                                </FormControl>
                                {touched?.source && errors?.source ? (
                                    <FormHelperText error>{errors?.source}</FormHelperText>
                                ) : (
                                    ''
                                )}
                            </Grid>

                            <Grid item xs={12} sm={3}>
                                <CustomDatePicker
                                    onChange={(newValue) => {
                                        setValues({...values, dateFrom: newValue});
                                    }}
                                    dateLabel="Date from"

                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <CustomDatePicker
                                    onChange={(newValue) => {
                                        setValues({...values, dateTo: newValue});
                                    }}
                                    dateLabel="Date to"
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <FormControl fullWidth>
                                    <InputLabel id="category-label">Category</InputLabel>
                                    <Select
                                        labelId="category-label"
                                        id="category-label"
                                        label="Select Category"
                                        value={values.category}
                                        onChange={(e) => setValues({...values, category: e.target.value})}
                                    >
                                        {categories?.map((category) => (
                                            <MenuItem value={category}>{category}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <Button type="submit" variant="contained" size="large" color="warning" sx={{py: 2}}
                                        fullWidth>Search</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Container>
        </>
    )
}

export default Searchbar;