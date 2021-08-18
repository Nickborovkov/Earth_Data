import s from "./pagination.module.css";
import {MdNavigateBefore, MdNavigateNext} from "react-icons/md";
import {nextPage, prevPage} from "../../reducers/nasaLibrary";
import React from "react";
import {useDispatch} from "react-redux";

const Pagination = ({page, prevPageCondition, nextPageCondition}) => {

    const dispatch = useDispatch()

    return (
        <div className={s.buttonsHolder}>
            {page > prevPageCondition &&
            <MdNavigateBefore className={s.pageButton}
                              onClick={ () => {dispatch(prevPage())} }/>}

            {page !== nextPageCondition &&
            <MdNavigateNext className={s.pageButton}
                            onClick={ () => {dispatch(nextPage())} }/>}
        </div>
    )
}


export default Pagination