import React from "react";
import Link from "next/link";
import styles from "../SearchBlock.module.scss";
import {SearchOff as SearchOffIcon, SearchOutlined as SearchIcon, Send} from "@mui/icons-material";
import {Avatar, IconButton, List, ListItem, Paper} from "@mui/material";
import {FollowButton} from "../../FollowButton";

export const SearchUsers = ({usersData, searchHandler, searchStr, setSearchStr, setArray, toggleOption}) => {
    return (
        <div>
            <div className={styles.searchWrapper}>
                <div className={styles.searchBlock}>
                    <SearchIcon className={styles.searchIconSvg}/>
                    <input
                        value={searchStr}
                        onChange={e => setSearchStr(e.target.value)}
                        placeholder="Поиск по пользователям"/>
                    <IconButton style={{color: '#fff'}} onClick={searchHandler}>
                        <Send/>
                    </IconButton>
                    <IconButton style={{color: '#fff'}} onClick={toggleOption}>
                        <SearchOffIcon/>
                    </IconButton>
                </div>
            </div>
            <Paper style={!!usersData.length ? {display: "flex"} : {}} className={styles.listWrapper}>
                <List>
                    {usersData && usersData.map(el =>
                        <ListItem className='users-listItem' key={el.id}>
                            <Link href={`/users/${el.id}`}>
                                <div className={styles.listItemUser}>
                                    <Avatar src={el.avatarUrl}>{el.fullName[0]}</Avatar>
                                    <span>{el.fullName}</span>
                                </div>
                            </Link>
                            <FollowButton id={el.id}/>
                        </ListItem>)
                    }
                    <ListItem
                        style={{display: "flex", justifyContent: "space-between", cursor: "pointer"}}>
                        <div onClick={() => setArray([])}>Закрыть</div>
                        <Link href={{pathname: '/users/', query: {keyword: searchStr}}}>Все</Link>
                    </ListItem>
                </List>
            </Paper>
        </div>
    )
}