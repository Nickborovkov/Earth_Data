import React from "react";
import {Formik} from "formik";
import * as yup from 'yup'
import {useDispatch} from "react-redux";
import {setParameters} from "../../../reducers/earth";

const ParametersPicker = () => {

    const dispatch = useDispatch()

    const validationSchema = yup.object().shape({
        longitude: yup.number().required(`Field is required`),
        latitude: yup.number().required(`Field is required`),
        date: yup.string().required(`Field is required`),
        dimensions: yup.number().required(`Field is required`),
    })

    return (
        <div>
            <Formik
                initialValues={{
                    longitude: ``,
                    latitude: ``,
                    date: ``,
                    dimensions: ``
                }}
                validateOnBlur
                onSubmit={ (values, {resetForm}) => {
                    dispatch(setParameters(values.longitude, values.latitude ,values.date ,values.dimensions))
                    resetForm({values: ``})
                } }
                validationSchema={validationSchema}
            >
                { ({values, errors, touched, handleSubmit, handleChange, handleBlur, isValid, dirty}) => (
                    <div>
                        <h3>Choose new parameters</h3>
                        <div>
                            {touched.longitude && errors.longitude &&
                            <div>{errors.longitude}</div>}
                            <input type="text"
                                   name='longitude'
                                   value={values.longitude}
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   placeholder='Enter longitude here...'/>
                        </div>
                        <div>
                            {touched.latitude && errors.latitude &&
                            <div>{errors.latitude}</div>}
                            <input type="text"
                                   name='latitude'
                                   value={values.latitude}
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   placeholder='Enter latitude here...'/>
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
                        <div>
                            {touched.dimensions && errors.dimensions &&
                            <div>{errors.dimensions}</div>}
                            <input type="text"
                                   name='dimensions'
                                   value={values.dimensions}
                                   onChange={handleChange}
                                   onBlur={handleBlur}
                                   placeholder='Enter size in degrees here...'/>
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

export default ParametersPicker