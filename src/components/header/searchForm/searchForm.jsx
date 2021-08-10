import React from "react";
import s from '../header.module.css'
import {useDispatch} from "react-redux";
import {Formik} from "formik";
import {setCurrentSearch, setSearchStart} from "../../../reducers/nasaLibrary";
import { BsSearch } from 'react-icons/bs';

const SearchForm = () => {

    const dispatch = useDispatch()

    return (
        <div className={s.searchForm}>
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
                    <div>
                        <input className={s.searchInput}
                               type="text"
                               name='search'
                               value={values.search}
                               onChange={handleChange}
                               onBlur={handleBlur}
                               placeholder='Search in NASA archive'/>
                        <button className={s.searchButton}
                                disabled={!isValid && !dirty}
                                onClick={handleSubmit}
                                type='submit'><BsSearch/></button>
                    </div>
                ) }
            </Formik>
        </div>
    )
}

export default SearchForm