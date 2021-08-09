import React from "react";
import {useDispatch} from "react-redux";
import * as yup from 'yup'
import {Formik} from "formik";
import {setEarthImageDate} from "../../../reducers/earthImage";

const SetDateEarthImage = () => {

    const dispatch = useDispatch()
    const validationSchema = yup.object().shape({
        selectedDate: yup.string().required(`Field is required`)
    })

    return (
        <div>
            <Formik
                initialValues={{
                    selectedDate: ``
                }}
                validateOnBlur
                onSubmit={ (values, {resetForm}) => {
                    dispatch(setEarthImageDate(values.selectedDate))
                    resetForm({values: ``})
                } }
                validationSchema={validationSchema}
            >
                { ({values, touched, errors, handleSubmit, handleBlur, handleChange, isValid, dirty}) => (
                    <div>
                        <h3>Select date to show</h3>
                        <div>
                            {touched.selectedDate && errors.selectedDate &&
                            <div>{errors.selectedDate}</div>}
                            <input type="date"
                                   name='selectedDate'
                                   value={values.selectedDate}
                                   onBlur={handleBlur}
                                   onChange={handleChange}/>
                        </div>
                        <button disabled={!isValid && !dirty}
                                onClick={handleSubmit}
                                type='submit'>Show</button>
                    </div>
                ) }
            </Formik>
        </div>
    )
}

export default SetDateEarthImage