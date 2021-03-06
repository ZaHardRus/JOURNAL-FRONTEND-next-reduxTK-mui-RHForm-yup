import styles from "../SearchBlock.module.scss";
import {
    DoubleArrow as DoubleArrowIcon,
    SearchOff as SearchOffIcon,
    SearchOutlined as SearchIcon,
    Send
} from "@mui/icons-material";
import {Avatar, IconButton, List, ListItem, Paper} from "@mui/material";
import Link from "next/link";
import React from "react";

export const SearchArticles = ({articlesData, searchHandler, searchStr, setSearchStr, setArray, toggleOption}) => {
    return (
        <div>
            <div className={styles.searchWrapper}>
                <div className={styles.searchBlock}>
                    <SearchIcon className={styles.searchIconSvg}/>
                    <input
                        value={searchStr}
                        onChange={e => setSearchStr(e.target.value)}
                        placeholder="Поиск по статьям"/>
                    <IconButton style={{color: '#fff'}} onClick={searchHandler}>
                        <Send/>
                    </IconButton>
                    <IconButton style={{color: '#fff'}} onClick={toggleOption}>
                        <SearchOffIcon/>
                    </IconButton>
                </div>
            </div>
            <Paper style={!!articlesData.length ? {display: "flex"} : {}} className={styles.listWrapper}>
                <List>
                    {articlesData && articlesData.map(el =>
                        <ListItem className='users-listItem' key={el.id}>
                            <div>
                                <div className={styles.listItemUser}>
                                    <Avatar src={el.user.avatarUrl}>{el.user.fullName[0]}</Avatar>
                                    <span>{el.title}</span>
                                </div>
                            </div>
                            <IconButton>
                                <Link href={`/news/${el.id}`}>
                                    <DoubleArrowIcon/>
                                </Link>
                            </IconButton>

                        </ListItem>)
                    }
                    <ListItem
                        style={{display: "flex", justifyContent: "space-between", cursor: "pointer"}}>
                        <div onClick={() => setArray([])}>Закрыть</div>
                        <Link href={{pathname: '/news/', query: {keyword: searchStr}}}>Все</Link>
                    </ListItem>
                </List>
            </Paper>
        </div>
    )
}