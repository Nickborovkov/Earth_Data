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
                        <input className="form-control-lg"
                               type="text"
                               name='search'
                               value={values.search}
                               onChange={handleChange}
                               onBlur={handleBlur}
                               placeholder='Search in NASA image and videos library'/>
                        <button className='btn btn-light'
                                disabled={!isValid && !dirty}
                                onClick={handleSubmit}
                                type='submit'>Find</button>
                    </div>
                ) }
            </Formik>
        </div>
    )
}

export default SearchForm