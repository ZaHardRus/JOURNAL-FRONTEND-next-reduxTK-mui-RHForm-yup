import {Post} from "../Post";
import {Pagination} from "@mui/material";
import React, {useEffect} from "react";
import {usePagination} from "../../hooks/usePagination";

export const ArticlesList = ({articles, count, requestHandler}) => {
    const {
        take,
        currentPage,
        setData: setArrayArticles,
        setCurrentPage,
        data: arrayArticles,
        pageCount
    } = usePagination(articles, count)

    const removeArticleHandler = (id) => {
        setArrayArticles(prev => [...prev.filter(el => el.id !== id)])
    }
    const changePageHandler = (_, value) => {
        setCurrentPage(value)
    }
    useEffect(() => {
        (async () => {
            const [articles, countArticles] = await requestHandler(take, currentPage)
            setArrayArticles(articles)
        })()
    }, [currentPage])

    return (
        <>
            {arrayArticles && arrayArticles.map(obj => <Post key={obj.id}
                                                             removeArticleHandler={removeArticleHandler}
                                                             id={obj.id} title={obj.title}
                                                             description={obj.description}
                                                             user={obj.user} {...obj}
            />)}
            <Pagination
                defaultValue={currentPage}
                onChange={changePageHandler}
                count={pageCount}
            />
        </>
    )
}