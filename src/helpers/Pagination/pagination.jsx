import s from "./pagination.module.css";
import {MdNavigateBefore, MdNavigateNext} from "react-icons/md";
import React from "react";
import {useDispatch} from "react-redux";

const Pagination = ({page, prevPageCondition, prevPageDispatch,
                        nextPageCondition, nextPageDispatch}) => {

    const dispatch = useDispatch()

    return (
        <div className={s.buttonsHolder}>
            {page > prevPageCondition &&
            <MdNavigateBefore className={s.pageButton}
                              onClick={ () => {dispatch(prevPageDispatch())} }/>}

            {page !== nextPageCondition &&
            <MdNavigateNext className={s.pageButton}
                            onClick={ () => {dispatch(nextPageDispatch())} }/>}
        </div>
    )
}


export default Pagination