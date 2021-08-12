import React from "react";
import s from '../../../helpers/formHelpers/formsStyles.module.css'
import m from "../../../helpers/formHelpers/formsStylesMedia.module.css";
import cn from "classnames";
import * as yup from 'yup'
import {useDispatch, useSelector} from "react-redux";
import {Field, Formik} from "formik";
import {setMarsRoverParams} from "../../../reducers/marsRover";
import {formButtonHelper, formInputHelper} from "../../../helpers/formHelpers/formHelpers";
import {dateToday} from "../../../helpers/dateToday";
import { RiErrorWarningFill } from 'react-icons/ri'

const MarsRoverParams = () => {

    const dispatch= useDispatch()
    const emptyPhotos = useSelector(state => state.marsRover.emptyPhotos)
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
                    <form className={cn(s.form, m.form)}>
                        <h3 className={s.title}>Set rover and date parameters</h3>
                        <div className={s.inputsHolder}>
                            <div className={s.inputHolder}>
                                <p className={s.formSubtitle}>Rover</p>
                                <Field as='select'
                                       name='rover'
                                       className={s.inputSelect}>
                                    <option className={s.option}
                                            value="">Choose rover</option>
                                    <option className={s.option}
                                            value="spirit">Spirit</option>
                                    <option className={s.option}
                                            value="opportunity">Opportunity</option>
                                    <option className={s.option}
                                            value="curiosity">Curiosity</option>
                                </Field>
                                {touched.rover && errors.rover &&
                                <div className={s.errors}><RiErrorWarningFill/>   {errors.rover}</div>}
                            </div>
                            {formInputHelper(s.formSubtitle, `Date`, touched.date, errors.date,
                                s.input, `date`, `date`, null, dateToday, handleChange,
                                handleBlur, values.date)}
                        </div>
                        {formButtonHelper(s.formButton, isValid, dirty, handleSubmit, `Show`)}

                        {emptyPhotos && <div className={s.errorResponse}>Not available, please change rover or date</div>}
                    </form>
                ) }
            </Formik>
        </div>
    )
}

export default MarsRoverParams