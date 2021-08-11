import React from "react";
import s from '../marsRover.module.css'
import * as yup from 'yup'
import {useDispatch} from "react-redux";
import {Field, Formik} from "formik";
import {setMarsRoverParams} from "../../../reducers/marsRover";
import {formButtonHelper, formInputHelper} from "../../../helpers/formHelpers/formHelpers";
import {dateToday} from "../../../helpers/dateToday";

const MarsRoverParams = () => {

    const dispatch= useDispatch()
    const validationSchema = yup.object().shape({
        date: yup
            .string()
            .required(`Date required`),
        rover: yup
            .string()
            .required(`Rover required`)
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
                    <form>
                        <h3>Choose rover parameters</h3>
                        <div>
                            <div>
                                <p className={s.formSubtitle}>Rover</p>
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
                            {formInputHelper(s.formSubtitle, `Date`, touched.date, errors.date,
                                s.input, `date`, `date`, dateToday, handleChange,
                                handleBlur, values.date)}
                        </div>

                        {formButtonHelper(s.formButton, isValid, dirty, handleSubmit, `Show`)}
                    </form>
                ) }
            </Formik>
        </div>
    )
}

export default MarsRoverParams