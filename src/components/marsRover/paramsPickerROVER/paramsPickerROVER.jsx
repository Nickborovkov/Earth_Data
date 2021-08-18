import React, {useState} from "react";
import s from '../../../helpers/formHelpers/formsStyles.module.css'
import m from "../../../helpers/formHelpers/formsStylesMedia.module.css";
import cn from "classnames";
import * as yup from 'yup'
import {useDispatch, useSelector} from "react-redux";
import {Formik} from "formik";
import {setMarsRoverParams} from "../../../reducers/marsRover";
import {formButtonHelper, formInputHelper} from "../../../helpers/formHelpers/formHelpers";
import {dateToday} from "../../../helpers/dateHelper/dateToday";
import {setNewError} from "../../../reducers/errors";

const ParamsPickerROVER = () => {

    const dispatch= useDispatch()
    const error = useSelector(state => state.errors.error)

    const [rover, setRover] = useState(`spirit`)

    const validationSchema = yup.object().shape({
        date: yup
            .string()
            .required(`Date required`),
    })

    return (
        <div>
            <Formik
                initialValues={{
                    date: ``
                }}
                validateOnBlur
                onSubmit={ (values) => {
                    if(rover === `spirit`){
                        dispatch(setMarsRoverParams(`spirit`, values.date))
                    }else if(rover === `opportunity`){
                        dispatch(setMarsRoverParams(`opportunity`, values.date))
                    }else if(rover === `curiosity`){
                        dispatch(setMarsRoverParams(`curiosity`, values.date))
                    }

                    dispatch(setNewError(null))
                } }
                validationSchema={validationSchema}
            >
                { ({values, touched, errors, handleChange, handleBlur, handleSubmit, isValid, dirty}) => (
                    <form className={cn(s.form, m.form)}>

                        <h3 className={s.title}>Set rover and date parameters</h3>

                        <div className={s.typesHolder}>
                            <button className={s.typeButton}
                                    type='button'
                                    onClick={ () => {setRover(`spirit`)} }>Spirit</button>
                            <button className={s.typeButton}
                                    type='button'
                                    onClick={ () => {setRover(`opportunity`)} }>Opportunity</button>
                            <button className={s.typeButton}
                                    type='button'
                                    onClick={ () => {setRover(`curiosity`)} }>Curiosity</button>
                        </div>


                        <div className={s.inputsHolder}>


                            <div className={s.inputHolder}>

                                {rover === `spirit` && <div>
                                    {formInputHelper(s.formSubtitle, `Date for Spirit`, touched.date, errors.date,
                                        s.input, `date`, `date`, `2004-01-05`, `2010-03-14`, handleChange,
                                        handleBlur, values.date)}
                                </div>}
                                {rover === `opportunity` && <div>
                                    {formInputHelper(s.formSubtitle, `Date for Opportunity`, touched.date, errors.date,
                                        s.input, `date`, `date`, `2004-01-26`, dateToday, handleChange,
                                        handleBlur, values.date)}
                                </div>}
                                {rover === `curiosity` && <div>
                                    {formInputHelper(s.formSubtitle, `Date for Curiosity`, touched.date, errors.date,
                                        s.input, `date`, `date`, `2012-08-06`, dateToday, handleChange,
                                        handleBlur, values.date)}
                                </div>}

                            </div>

                        </div>
                        {formButtonHelper(s.formButton, isValid, dirty, handleSubmit, `Show`)}
                        {error && <h3 className={s.errorCase}>Not available, please change date</h3>}
                    </form>
                ) }
            </Formik>
        </div>
    )
}

export default ParamsPickerROVER