import React from "react";
import s from '../neows.module.css'
import {Formik} from "formik";
import * as yup from 'yup'
import {useDispatch} from "react-redux";
import {setIntervalDate} from "../../../reducers/neows";
import {formButtonHelper, formInputHelper} from "../../../helpers/formHelpers/formHelpers";
import {dateToday} from "../../../helpers/dateToday";


const SetIntervalNEOWS = () => {

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
                onSubmit={ (values, {resetForm}) => {
                    dispatch(setIntervalDate(values.startDate, values.endDate))
                    resetForm({values: ``})
                }}
                validationSchema={validationSchema}
            >
                { ({values, errors, touched, handleSubmit, handleBlur, handleChange, isValid, dirty}) => (
                    <div>
                        <h3>Choose interval</h3>
                        <div>

                            {formInputHelper(s.formSubtitle, `Start date`, touched.startDate,
                                errors.startDate, s.input, `date`, `startDate`, dateToday, handleChange,
                                handleBlur, values.startDate)}

                            {formInputHelper(s.formSubtitle, `End date`, touched.endDate,
                                errors.endDate, s.input, `date`, `endDate`, dateToday, handleChange,
                                handleBlur, values.endDate)}

                        </div>
                        {formButtonHelper(s.formButton, isValid, dirty, handleSubmit, `Show`)}
                    </div>
                ) }
            </Formik>
        </div>
    )
}

export default SetIntervalNEOWS