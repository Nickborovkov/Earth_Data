import React from "react";
import s from '../../../helpers/formHelpers/formsStyles.module.css'
import m from '../../../helpers/formHelpers/formsStylesMedia.module.css'
import cn from 'classnames'
import {useDispatch, useSelector} from "react-redux";
import * as yup from 'yup'
import {Formik} from "formik";
import {setEarthImageDate} from "../../../reducers/earthImage";
import {formButtonHelper, formInputHelper} from "../../../helpers/formHelpers/formHelpers";
import {dateToday} from "../../../helpers/dateHelper/dateToday";
import {setNewError} from "../../../reducers/errors";

const SetDateEarthImage = () => {

    const dispatch = useDispatch()
    const error = useSelector(state => state.errors.error)
    const validationSchema = yup.object().shape({
        selectedDate: yup
            .string()
            .required(`Date required`)
    })

    return (
        <div>
            <Formik
                initialValues={{
                    selectedDate: ``
                }}
                validateOnBlur
                onSubmit={ (values) => {
                    dispatch(setEarthImageDate(values.selectedDate))
                    dispatch(setNewError(null))
                } }
                validationSchema={validationSchema}
            >
                { ({values, touched, errors, handleSubmit, handleBlur, handleChange, isValid, dirty}) => (
                    <form className={cn(s.form, m.form)}>
                        <h3 className={s.title}>Set exact date</h3>
                        <div className={s.inputsHolder}>
                            {formInputHelper(s.formSubtitle, `Date`, touched.selectedDate, errors.selectedDate,
                                s.input, `date`, `selectedDate`, `2015-06-13`, dateToday, handleChange,
                                handleBlur, values.selectedDate)}
                        </div>
                        {formButtonHelper(s.formButton, isValid, dirty, handleSubmit, `Show`)}
                        {error && <h3 className={s.errorCase}>Not available, please change date</h3>}
                    </form>
                ) }
            </Formik>
        </div>
    )
}

export default SetDateEarthImage