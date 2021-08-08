import React from "react";
import {Formik} from "formik";
import * as yup from 'yup'
import {useDispatch} from "react-redux";
import {setIntervalDates} from "../../../reducers/apod";

const ChooseDateInterval = () => {

    const dispatch = useDispatch()

    const validationSchema = yup.object().shape({
        startDate: yup.string().required(`Field is required`),
        endDate: yup.string().required(`Field is required`),
    })

    return (
        <div>
            <Formik
                initialValues={{
                    startDate: ``,
                    endDate: ``,
                }}
                validateOnBlur
                onSubmit={ (values, {resetForm}) => {
                    dispatch(setIntervalDates(values.startDate, values.endDate))
                    resetForm({values: ``})
                }}
                validationSchema={validationSchema}
            >
                { ({values, errors, touched, handleSubmit, handleBlur, handleChange, isValid, dirty}) => (
                    <div>
                        <h3>Choose interval</h3>
                        <div>
                            {touched.startDate && errors.startDate &&
                            <div>{errors.startDate}</div>}
                            <input type="date"
                                   name='startDate'
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   value={values.startDate}/>
                        </div>
                        <div>
                            {touched.endDate && errors.endDate &&
                            <div>{errors.endDate}</div>}
                            <input type="date"
                                   name='endDate'
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   value={values.endDate}/>
                        </div>
                        <button disabled={!isValid && !dirty}
                                onClick={handleSubmit}
                                type={'submit'}>
                            Show</button>

                    </div>
                ) }
            </Formik>
        </div>
    )
}

export default ChooseDateInterval