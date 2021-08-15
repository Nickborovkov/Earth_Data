import React from "react";
import s from '../header.module.css'
import m from '../headerMedia.module.css'
import cn from 'classnames'
import {useDispatch} from "react-redux";
import {Formik} from "formik";
import * as yup from 'yup'
import {setCurrentSearch, setSearchStart} from "../../../reducers/nasaLibrary";
import { BsSearch } from 'react-icons/bs';
import {formButtonHelper} from "../../../helpers/formHelpers/formHelpers";
import {setNewError} from "../../../reducers/errors";

const SearchForm = () => {

    const dispatch = useDispatch()
    const regexp = /^[a-zA-Z0-9_., -]*$/
    const validationSchema = yup.object().shape({
        search: yup
            .string()
            .matches(regexp, `Only english letters and digits`)
    })

    return (
        <div>
            <Formik
                initialValues={{
                    search: ``
                }}
                validateOnBlur
                onSubmit={ (values) => {
                    dispatch(setCurrentSearch(values.search))
                    dispatch(setSearchStart(true))
                    dispatch(setNewError(null))
                } }
                validationSchema={validationSchema}
            >
                { ({touched, errors, values, handleBlur, handleChange, handleSubmit, isValid,
                       dirty, handleReset}) => (
                    <form className={cn(s.searchForm, m.searchForm)}>
                        <input className={cn(s.searchInput, m.searchInput)}
                               type="text"
                               name='search'
                               value={values.search}
                               onChange={handleChange}
                               onBlur={handleBlur}
                               placeholder='Search in NASA archive'
                               onClick={handleReset}/>
                        {formButtonHelper(cn(s.searchButton, m.searchButton), isValid, dirty,
                            handleSubmit, <BsSearch/>)}
                        {touched.search && errors.search &&
                        <div className={cn(s.searchError, m.searchError)}>{errors.search}</div>}
                    </form>
                ) }
            </Formik>
        </div>
    )
}

export default SearchForm