import React from "react";
import {useDispatch} from "react-redux";
import {Formik} from "formik";
import * as yup from 'yup'
import {setCurrentSearch} from "../../../reducers/nasaLibrary";

const SearchForm = () => {

    const dispatch = useDispatch()

    const validationSchema = yup.object().shape({
        search: yup.string().required(`This field is required`)
    })

    return (
        <div>
            <Formik
                initialValues={{
                    search: ``
                }}
                validateOnBlur
                onSubmit={ (values, {resetForm}) => {
                    dispatch(setCurrentSearch(values.search))
                    resetForm({values: ``})
                } }
                validationSchema={validationSchema}
            >
                { ({values, errors, touched, handleBlur, handleChange, handleSubmit, isValid, dirty}) => (
                    <div>
                        <h3>Type to find items in NASA library</h3>
                        {touched.search && errors.search &&
                        <div>{errors.search}</div>}
                        <input type="text"
                               name='search'
                               value={values.search}
                               onChange={handleChange}
                               onBlur={handleBlur}
                               placeholder='Come on, man'/>
                        <button disabled={!isValid && !dirty}
                                onClick={handleSubmit}
                                type='submit'>Find</button>
                    </div>
                ) }
            </Formik>
        </div>
    )
}

export default SearchForm