import React from "react";
import s from '../earth.module.css'
import {Formik} from "formik";
import * as yup from 'yup'
import {useDispatch} from "react-redux";
import {setParameters} from "../../../reducers/earth";
import {
    formButtonHelper,
    formInputHelper
} from "../../../helpers/formHelpers/formHelpers";
import {dateToday} from "../../../helpers/dateToday";

const ParametersPicker = () => {

    const dispatch = useDispatch()

    const validationSchema = yup.object().shape({
        longitude: yup
            .number()
            .required(`Longitude required`)
            .typeError(`Only numbers`)
            .min(-180, `Enter longitude from -180 to 180`)
            .max(180, `Enter longitude from -180 to 180`),
        latitude: yup
            .number()
            .required(`Latitude required`)
            .typeError(`Only numbers`)
            .min(-90, `Enter latitude from -90 to 90`)
            .max(90, `Enter latitude from -90 to 90`),
        date: yup
            .string()
            .required(`Date required`),
        dimensions: yup
            .number()
            .required(`Dimensions required`)
            .typeError(`Only numbers`)
            .min(0, `Enter float number from 0 to 1`)
            .max(1, `Enter float number from 0 to 1`),
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
                    <fomr>
                        <h3>Choose new parameters</h3>
                        {formInputHelper(s.formSubtitle, `Longitude`, touched.longitude,
                            errors.longitude, s.input, `text`, `longitude`, null, handleChange,
                            handleBlur, values.longitude)}

                        {formInputHelper(s.formSubtitle, `Latitude`, touched.latitude,
                            errors.latitude, s.input, `text`, `latitude`, null, handleChange,
                            handleBlur, values.latitude)}

                        {formInputHelper(s.formSubtitle, `Date`, touched.date,
                            errors.date, s.input, `date`, `date`, dateToday, handleChange,
                            handleBlur, values.date)}

                        {formInputHelper(s.formSubtitle, `Dimensions`, touched.dimensions,
                            errors.dimensions, s.input, `text`, `dimensions`, null, handleChange,
                            handleBlur, values.dimensions)}

                        {formButtonHelper(s.formButton, isValid, dirty, handleSubmit, `Show`)}
                    </fomr>
                ) }
            </Formik>
        </div>
        )
}

export default ParametersPicker