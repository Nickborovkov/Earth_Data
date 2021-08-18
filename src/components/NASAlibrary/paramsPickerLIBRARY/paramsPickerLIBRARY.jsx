import React, {useState} from "react";
import {Formik} from "formik";
import * as yup from 'yup'
import {useDispatch} from "react-redux";
import {setParamsLibrary} from "../../../reducers/nasaLibrary";
import {yearNow} from "../../../helpers/dateHelper/dateToday";
import {formButtonHelper, formInputHelper} from "../../../helpers/formHelpers/formHelpers";
import s from "../../../helpers/formHelpers/formsStyles.module.css";
import cn from "classnames";
import m from "../../../helpers/formHelpers/formsStylesMedia.module.css";

const ParamsPickerLIBRARY = () => {

    const dispatch = useDispatch()

    const [mediaType, setMediaType] = useState(`image`)

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
                   if(mediaType === `image`){
                       dispatch(setParamsLibrary(`image` ,values.startYear,values.endYear ))
                   }
                   if(mediaType === `video`){
                       dispatch(setParamsLibrary(`video` ,values.startYear,values.endYear ))
                   }
               } }
               validationSchema={validationSchema}
           >
               { ({values, touched, errors, handleChange, handleBlur, handleSubmit, isValid, dirty}) => (
                   <form className={cn(s.form, m.form)}>

                       <h3 className={s.title}>Set media type and date</h3>

                       <div className={s.typesHolder}>
                           <button className={s.typeButton}
                                   type='button'
                                   onClick={ () => {setMediaType(`image`)} }>Images</button>
                           <button className={s.typeButton}
                                   type='button'
                                   onClick={ () => {setMediaType(`video`)} }>Videos</button>
                       </div>

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