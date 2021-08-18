import React from "react";
import s from "../../../helpers/formHelpers/formsStyles.module.css";
import m from "../../../helpers/formHelpers/formsStylesMedia.module.css";
import cn from 'classnames'
import {Formik} from "formik";
import * as yup from 'yup'
import {useDispatch, useSelector} from "react-redux";
import {setIntervalDates} from "../../../reducers/apod";
import {formButtonHelper, formInputHelper} from "../../../helpers/formHelpers/formHelpers";
import {dateToday} from "../../../helpers/dateHelper/dateToday";
import {setNewError} from "../../../reducers/errors";


const SetIntervalAPOD = () => {

    const dispatch = useDispatch()
    const error = useSelector(state => state.errors.error)

    const validationSchema = yup.object().shape({
        startDate: yup
            .string()
            .required(`Start date required`),
        endDate: yup
            .string()
            .required(`End date required`),
    })

    return (
        <div>
            <Formik
                initialValues={{
                    startDate: ``,
                    endDate: ``,
                }}
                validateOnBlur
                onSubmit={ (values) => {
                    dispatch(setIntervalDates(values.startDate, values.endDate))
                    dispatch(setNewError(null))
                }}
                validationSchema={validationSchema}
            >
                { ({values, errors, touched, handleSubmit, handleBlur, handleChange, isValid, dirty}) => (
                    <form className={cn(s.form, m.form)}>
                        <h3 className={s.title}>Set time interval</h3>
                        <div className={s.inputsHolder}>

                            {formInputHelper(s.formSubtitle, `Start date`, touched.startDate,
                                errors.startDate, s.input, `date`, `startDate`, `1995-01-07`, dateToday, handleChange,
                                handleBlur, values.startDate)}

                            {formInputHelper(s.formSubtitle, `End date`, touched.endDate,
                                errors.endDate, s.input, `date`, `endDate`, `1995-01-07`, dateToday, handleChange,
                                handleBlur, values.endDate)}

                        </div>
                        {formButtonHelper(s.formButton, isValid, dirty, handleSubmit, `Show`)}
                        {error && <h3 className={s.errorCase}>Not available, please change date interval</h3>}
                    </form>
                ) }
            </Formik>
        </div>
    )
}

export default SetIntervalAPOD