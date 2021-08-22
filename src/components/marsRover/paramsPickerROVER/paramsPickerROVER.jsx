import React, {useState} from "react";
import s from '../../../helpers/formHelpers/formsStyles.module.css'
import m from "../../../helpers/formHelpers/formsStylesMedia.module.css";
import cn from "classnames";
import * as yup from 'yup'
import {useDispatch} from "react-redux";
import {Formik} from "formik";
import {setMarsRoverParams} from "../../../reducers/marsRover";
import {formButtonHelper, formInputHelper} from "../../../helpers/formHelpers/formHelpers";
import {dateToday} from "../../../helpers/dateHelper/dateToday";
import {setNewError} from "../../../reducers/common";

const ParamsPickerROVER = ({setParams}) => {

    const dispatch= useDispatch()

    //Choosing rover
    const [rover, setRover] = useState(`spirit`)

    //Active rover from applying styles
    const [activeRover, setActiveRover] = useState({
        spirit: true,
        opportunity: false,
        curiosity: false,
    })

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
                    //Reset error after submit
                    dispatch(setNewError(null))
                    //Close params after submit
                    setParams(false)
                } }
                validationSchema={validationSchema}
            >
                { ({values, touched, errors, handleChange, handleBlur,
                       handleSubmit, isValid, dirty}) => (
                    <form className={cn(s.form, m.form)}>

                        <h3 className={s.title}>Set rover and date parameters</h3>

                        <div className={s.typesHolder}>
                            <button className={cn(s.typeButton, activeRover.spirit && s.activeType)}
                                    type='button'
                                    onClick={ () => {
                                        setRover(`spirit`)
                                        setActiveRover({
                                            spirit: true,
                                            opportunity: false,
                                            curiosity: false,})
                                    } }>Spirit</button>
                            <button className={cn(s.typeButton, activeRover.opportunity && s.activeType)}
                                    type='button'
                                    onClick={ () => {
                                        setRover(`opportunity`)
                                        setActiveRover({
                                            spirit: false,
                                            opportunity: true,
                                            curiosity: false,})
                                    } }>Opportunity</button>
                            <button className={cn(s.typeButton, activeRover.curiosity && s.activeType)}
                                    type='button'
                                    onClick={ () => {
                                        setRover(`curiosity`)
                                        setActiveRover({
                                            spirit: false,
                                            opportunity: false,
                                            curiosity: true,})
                                    } }>Curiosity</button>
                        </div>


                        <div className={s.inputsHolder}>


                            <div className={s.inputHolder}>

                                {rover === `spirit` && <div>
                                    {formInputHelper(s.formSubtitle, `Date for Spirit`, touched.date,
                                        errors.date, s.input, `date`, `date`, `2004-01-05`,
                                        `2010-03-14`, handleChange, handleBlur, values.date, ``, true)}
                                </div>}
                                {rover === `opportunity` && <div>
                                    {formInputHelper(s.formSubtitle, `Date for Opportunity`,
                                        touched.date, errors.date, s.input, `date`, `date`,
                                        `2004-01-26`, dateToday, handleChange, handleBlur,
                                        values.date, ``, true)}
                                </div>}
                                {rover === `curiosity` && <div>
                                    {formInputHelper(s.formSubtitle, `Date for Curiosity`,
                                        touched.date, errors.date, s.input, `date`, `date`,
                                        `2012-08-06`, dateToday, handleChange, handleBlur,
                                        values.date, ``, true)}
                                </div>}

                            </div>

                        </div>
                        {formButtonHelper(s.formButton, isValid, dirty, handleSubmit, `Show`)}
                    </form>
                ) }
            </Formik>
        </div>
    )
}

export default ParamsPickerROVER