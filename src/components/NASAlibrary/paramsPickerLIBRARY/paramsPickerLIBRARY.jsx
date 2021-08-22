import React from "react";
import {Formik} from "formik";
import * as yup from 'yup'
import {useDispatch} from "react-redux";
import {setDateIntervalLibrary} from "../../../reducers/nasaLibrary";
import {yearNow} from "../../../helpers/dateHelper/dateToday";
import {formButtonHelper, formInputHelper} from "../../../helpers/formHelpers/formHelpers";
import s from "../../../helpers/formHelpers/formsStyles.module.css";
import cn from "classnames";
import m from "../../../helpers/formHelpers/formsStylesMedia.module.css";
import {setNewError} from "../../../reducers/common";

const ParamsPickerLIBRARY = ({setParams}) => {

    const dispatch = useDispatch()

    const validationSchema = yup.object().shape({
        startYear: yup
            .number()
            .required(`Start year is required`)
            .min(1920, `Min year is 1920`)
            .max(yearNow, `Max year is ${yearNow}`) ,
        endYear: yup
            .number()
            .required(`End year is required`)
            .min(1920, `Min year is 1920`)
            .max(yearNow, `Max year is ${yearNow}`) ,
    })

    return (
        <div>
           <Formik
               initialValues={{
                   startYear: ``,
                   endYear: ``,
               }}
               validateOnBlur
               onSubmit={ (values) => {
                   dispatch(setDateIntervalLibrary(values.startYear, values.endYear ))
                   //Reset error after submit
                   dispatch(setNewError(null))
                   //Close params after submit
                   setParams(false)
               } }
               validationSchema={validationSchema}
           >
               { ({values, touched, errors, handleChange, handleBlur, handleSubmit, isValid, dirty}) => (
                   <form className={cn(s.form, m.form)}>

                       <h3 className={s.title}>Set media type and date</h3>

                       <div className={s.inputsHolder}>
                           {formInputHelper(s.formSubtitle, `Start year`, touched.startYear, errors.startYear,
                               s.input, `number`, `startYear`, `1920`, yearNow, handleChange,
                               handleBlur, values.startYear)}
                           {formInputHelper(s.formSubtitle, `End year`, touched.endYear, errors.endYear,
                               s.input, `number`, `endYear`, `1920`, yearNow, handleChange,
                               handleBlur, values.endYear)}
                       </div>

                       {formButtonHelper(s.formButton, isValid, dirty, handleSubmit, `Show`)}

                   </form>
               ) }
           </Formik>
        </div>
    )
}

export default ParamsPickerLIBRARY