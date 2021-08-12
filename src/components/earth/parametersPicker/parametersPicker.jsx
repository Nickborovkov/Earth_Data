import React from "react";
import s from '../../../helpers/formHelpers/formsStyles.module.css'
import m from '../../../helpers/formHelpers/formsStylesMedia.module.css'
import cn from 'classnames'
import {Formik} from "formik";
import * as yup from 'yup'
import {useDispatch} from "react-redux";
import {setParameters} from "../../../reducers/earth";
import {
    formButtonHelper,
    formInputHelper
} from "../../../helpers/formHelpers/formHelpers";

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
    })

    return (
        <div>
            <Formik
                initialValues={{
                    longitude: ``,
                    latitude: ``,
                }}
                validateOnBlur
                onSubmit={ (values) => {
                    dispatch(setParameters(values.longitude, values.latitude ,values.date ,values.dimensions))
                } }
                validationSchema={validationSchema}
            >
                { ({values, errors, touched, handleSubmit, handleChange, handleBlur, isValid, dirty}) => (
                    <form className={cn(s.form, m.form)}>
                        <h3 className={s.title}>Set new parameters</h3>
                        <div className={s.inputsHolder}>
                            {formInputHelper(s.formSubtitle, `Longitude`, touched.longitude,
                                errors.longitude, s.input, `text`, `longitude`, null, null, handleChange,
                                handleBlur, values.longitude)}

                            {formInputHelper(s.formSubtitle, `Latitude`, touched.latitude,
                                errors.latitude, s.input, `text`, `latitude`, null, null, handleChange,
                                handleBlur, values.latitude)}

                        </div>

                        {formButtonHelper(s.formButton, isValid, dirty, handleSubmit, `Show`)}
                    </form>
                ) }
            </Formik>
        </div>
        )
}

export default ParametersPicker