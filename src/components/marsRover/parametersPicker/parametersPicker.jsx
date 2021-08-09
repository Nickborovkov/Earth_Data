import React from "react";
import * as yup from 'yup'
import {useDispatch} from "react-redux";
import {Field, Formik} from "formik";
import {setMarsRoverParams} from "../../../reducers/marsRover";

const MarsRoverParams = () => {

    const dispatch= useDispatch()
    const validationSchema = yup.object().shape({
        date: yup.string().required(`This field is required`),
    })

    return (
        <div>
            <Formik
                initialValues={{
                    rover: ``,
                    date: ``
                }}
                validateOnBlur
                onSubmit={ (values, {resetForm}) => {
                    dispatch(setMarsRoverParams(values.rover, values.date))
                    resetForm({values: ``})
                } }
                validationSchema={validationSchema}
            >
                { ({values, touched, errors, handleChange, handleBlur, handleSubmit, isValid, dirty}) => (
                    <div>
                        <h3>Choose rover parameters</h3>
                        <div>
                            {touched.rover && errors.rover &&
                            <div>{errors.rover}</div>}
                            <Field as='select'
                                   name='rover'>
                                <option value="">Choose rover</option>
                                <option value="spirit">Spirit</option>
                                <option value="opportunity">Opportunity</option>
                                <option value="curiosity">Curiosity</option>
                            </Field>
                        </div>
                        <div>
                            {touched.date && errors.date &&
                            <div>{errors.date}</div>}
                            <input type="date"
                                   name='date'
                                   value={values.date}
                                   onChange={handleChange}
                                   onBlur={handleBlur}/>
                        </div>
                        <button disabled={!isValid && !dirty}
                                type='submit'
                                onClick={handleSubmit}>Show</button>
                    </div>
                ) }
            </Formik>
        </div>
    )
}

export default MarsRoverParams