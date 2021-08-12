import React from "react";
import s from '../header.module.css'
import m from '../headerMedia.module.css'
import cn from 'classnames'
import {useDispatch} from "react-redux";
import {Formik} from "formik";
import {setCurrentSearch, setSearchStart} from "../../../reducers/nasaLibrary";
import { BsSearch } from 'react-icons/bs';

const SearchForm = () => {

    const dispatch = useDispatch()

    return (
        <div>
            <Formik
                initialValues={{
                    search: ``
                }}
                validateOnBlur
                onSubmit={ (values, {resetForm}) => {
                    dispatch(setCurrentSearch(values.search))
                    dispatch(setSearchStart(true))
                    resetForm({values: ``})
                } }
            >
                { ({values, handleBlur, handleChange, handleSubmit, isValid, dirty}) => (
                    <form className={cn(s.searchForm, m.searchForm)}>
                        <input className={cn(s.searchInput, m.searchInput)}
                               type="text"
                               name='search'
                               value={values.search}
                               onChange={handleChange}
                               onBlur={handleBlur}
                               placeholder='Search in NASA archive'/>
                        <button className={cn(s.searchButton, m.searchButton)}
                                disabled={!isValid && !dirty}
                                onClick={handleSubmit}
                                type='submit'><BsSearch/></button>
                    </form>
                ) }
            </Formik>
        </div>
    )
}

export default SearchForm