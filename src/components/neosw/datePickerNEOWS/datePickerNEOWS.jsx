import React, {memo} from "react";
import s from '../../../helpers/formHelpers/formsStyles.module.css'
import m from "../../../helpers/formHelpers/formsStylesMedia.module.css";
import cn from "classnames";
import {Formik} from "formik";
import * as yup from 'yup'
import {useDispatch} from "react-redux";
import {setIntervalDate} from "../../../store/neowsReducer";
import {formButtonHelper, formInputHelper} from "../../../helpers/formHelpers/formHelpers";
import {dateToday} from "../../../helpers/dateHelper/dateToday";
import {setNewError} from "../../../store/commonReducer";


const DatePickerNEOWS = memo(({setParams}) => {

    const dispatch = useDispatch()

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
                    dispatch(setIntervalDate(values.startDate, values.endDate))
                    //Reset error after submit
                    dispatch(setNewError(null))
                    //Closing params after submit
                    setParams(false)
                }}
                validationSchema={validationSchema}
            >
                { ({values, errors, touched, handleSubmit, handleBlur, handleChange, isValid, dirty}) => (
                    <form className={cn(s.form, m.form)}>
                        <h3 className={s.title}>Choose time interval</h3>
                        <div className={s.inputsHolder}>

                            {formInputHelper(s.formSubtitle, `Start date`, touched.startDate,
                                errors.startDate, s.input, `date`, `startDate`, `1900-01-01`,
                                dateToday, handleChange, handleBlur, values.startDate, ``, true)}

                            {formInputHelper(s.formSubtitle, `End date`, touched.endDate,
                                errors.endDate, s.input, `date`, `endDate`, `1900-01-01`,
                                dateToday, handleChange, handleBlur, values.endDate, ``, false)}

                        </div>
                        <p className={s.intervalHint}>Maximal interval is 1 week</p>
                        {formButtonHelper(s.formButton, isValid, dirty, handleSubmit, `Show`)}
                    </form>
                ) }
            </Formik>
        </div>
    )
})

export default DatePickerNEOWS
