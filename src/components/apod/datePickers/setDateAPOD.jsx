import React from "react";
import {Formik} from "formik";
import * as yup from 'yup'
import {useDispatch} from "react-redux";
import {setCurrentDate} from "../../../reducers/apod";

const SetDateAPOD = () => {

    const dispatch = useDispatch()

    const validationSchema = yup.object().shape({
        currentDate: yup.string().required(`Field is required`)
    })

    return (
        <div>
            <Formik
                initialValues={{
                    currentDate: ``
                }}
                validateOnBlur
                onSubmit={ (values, {resetForm}) => {
                    dispatch(setCurrentDate(values.currentDate))
                    resetForm({values: ``})
                } }
                validationSchema={validationSchema}
            >
                {({values, errors, touched, handleChange, handleBlur, handleSubmit, isValid, dirty})=>(
                    <div>
                        <h3>Choose exact date</h3>
                        {touched.currentDate && errors.currentDate &&
                        <div>{errors.currentDate}</div>}
                        <input type="date"
                               name='currentDate'
                               onChange={handleChange}
                               onBlur={handleBlur}
                               value={values.currentDate}
                        />
                        <button disabled={!isValid && !dirty}
                                onClick={handleSubmit}
                                type={`submit`}>
                            Show</button>
                    </div>
                )}
            </Formik>
        </div>
    )
}

export default SetDateAPOD