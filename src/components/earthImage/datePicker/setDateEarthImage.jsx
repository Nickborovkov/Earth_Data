import React from "react";
import s from '../earthImage.module.css'
import {useDispatch} from "react-redux";
import * as yup from 'yup'
import {Formik} from "formik";
import {setEarthImageDate} from "../../../reducers/earthImage";
import {formButtonHelper, formInputHelper} from "../../../helpers/formHelpers/formHelpers";
import {dateToday} from "../../../helpers/dateToday";

const SetDateEarthImage = () => {

    const dispatch = useDispatch()
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
                onSubmit={ (values, {resetForm}) => {
                    dispatch(setEarthImageDate(values.selectedDate))
                    resetForm({values: ``})
                } }
                validationSchema={validationSchema}
            >
                { ({values, touched, errors, handleSubmit, handleBlur, handleChange, isValid, dirty}) => (
                    <form>
                        <h3>Select date to show</h3>
                        {formInputHelper(s.formSubtitle, `Date`, touched.selectedDate, errors.selectedDate,
                            s.input, `date`, `selectedDate`, dateToday, handleChange,
                            handleBlur, values.selectedDate)}

                        {formButtonHelper(s.formButton, isValid, dirty, handleSubmit, `Show`)}
                    </form>
                ) }
            </Formik>
        </div>
    )
}

export default SetDateEarthImage