import React, {useEffect} from "react";
import {CommentItem} from "../CommentItem";
import {CommentResponse} from "../../utils/api/types";
import {usePagination} from "../../hooks/usePagination";
import {Pagination, Paper} from "@mui/material";

interface CommentsListProps {
    userId: number
    comments: Array<CommentResponse> | []
    count: number
    requestHandler: (userId: number, take: number, currentPage: number) => Promise<[Array<CommentResponse>, number]>
}

export const CommentsList: React.FC<CommentsListProps> = ({userId, comments, count, requestHandler}) => {
    const {
        take,
        currentPage,
        setData: setArrayComments,
        setCurrentPage,
        data: arrayComments,
        pageCount
    } = usePagination(comments, count)

    useEffect(() => {
        (async () => {
            const [comments] = await requestHandler(userId, take, currentPage)
            setArrayComments(comments)
        })()
    }, [currentPage])

    const changePageHandler = (_, value) => {
        setCurrentPage(value)
    }
    return (
        <div>
            {arrayComments && arrayComments.map(el => <CommentItem key={el.id}
                                                                   text={el.text}
                                                                   user={el.user}
                                                                   articleId={el.article.id}
                                                                   title={el.article.title}/>)}
            {!!count && <Paper>
                <Pagination
                    variant="outlined"
                    color="primary"
                    className={'d-flex justify-center p-10'}
                    defaultValue={currentPage}
                    onChange={changePageHandler}
                    count={pageCount}
                />
            </Paper>}
        </div>
    )
}