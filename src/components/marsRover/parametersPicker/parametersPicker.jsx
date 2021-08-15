import React from "react";
import s from '../../../helpers/formHelpers/formsStyles.module.css'
import m from "../../../helpers/formHelpers/formsStylesMedia.module.css";
import cn from "classnames";
import * as yup from 'yup'
import {useDispatch, useSelector} from "react-redux";
import {Field, Formik} from "formik";
import {setMarsRoverParams} from "../../../reducers/marsRover";
import {formButtonHelper, formInputHelper} from "../../../helpers/formHelpers/formHelpers";
import {dateToday} from "../../../helpers/dateHelper/dateToday";
import { RiErrorWarningFill } from 'react-icons/ri'
import {setNewError} from "../../../reducers/errors";

const MarsRoverParams = () => {

    const dispatch= useDispatch()
    const error = useSelector(state => state.errors.error)
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
                onSubmit={ (values) => {
                    dispatch(setMarsRoverParams(values.rover, values.date))
                    dispatch(setNewError(null))
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
                        {error && <h3 className={s.errorCase}>Not available, please change date or rover</h3>}
                    </form>
                ) }
            </Formik>
        </div>
    )
}

export default MarsRoverParams