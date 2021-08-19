import React from "react";
import s from '../../../helpers/formHelpers/formsStyles.module.css'
import m from '../../../helpers/formHelpers/formsStylesMedia.module.css'
import cn from 'classnames'
import {Formik} from "formik";
import * as yup from 'yup'
import {useDispatch} from "react-redux";
import {setCurrentDate} from "../../../reducers/apod";
import {formButtonHelper, formInputHelper} from "../../../helpers/formHelpers/formHelpers";
import {dateToday} from "../../../helpers/dateHelper/dateToday";
import {setNewError} from "../../../reducers/errors";

const SetDateAPOD = ({setParams}) => {

    const dispatch = useDispatch()

    const validationSchema = yup.object().shape({
        currentDate: yup
            .string()
            .required(`Date required`)
    })

    return (
        <div>
            <Formik
                initialValues={{
                    currentDate: ``
                }}
                validateOnBlur
                onSubmit={ (values) => {
                    dispatch(setCurrentDate(values.currentDate))
                    dispatch(setNewError(null))
                    setParams(false)
                } }
                validationSchema={validationSchema}
            >
                {({values, errors, touched, handleChange, handleBlur,
                      handleSubmit, isValid, dirty})=>(
                    <form className={cn(s.form, m.form)}>
                        <h3 className={s.title}>Set exact date</h3>
                        <div className={s.inputsHolder}>
                            {formInputHelper(s.formSubtitle, `Date`, touched.currentDate,
                                errors.currentDate, s.input, `date`, `currentDate`, `1995-01-07`,
                                dateToday, handleChange, handleBlur, values.currentDate, ``, true)}
                        </div>
                        {formButtonHelper(s.formButton, isValid, dirty, handleSubmit, `Show`)}
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default SetDateAPOD