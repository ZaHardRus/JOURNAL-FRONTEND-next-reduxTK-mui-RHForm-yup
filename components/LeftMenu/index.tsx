import React from 'react';
import Link from 'next/link';
import {Button} from '@mui/material';
import {
    FormatListBulletedOutlined as ListIcon,
    PeopleAltOutlined as UsersIcon,
    RecentActorsOutlined,
    StarBorder,
    WhatshotOutlined as FireIcon
} from '@mui/icons-material';

import styles from './LeftMenu.module.scss';
import {useRouter} from "next/router";
import {useAppSelector} from "../../redux/hooks";
import {selectUserData} from "../../redux/slices/user";
import Paper from '@mui/material/Paper';


export const LeftMenu: React.FC = () => {
    const router = useRouter()
    const currentUser = useAppSelector(selectUserData)

    const menu = [
        {text: 'Свежее', icon: <FireIcon/>, path: '/',private:false},
        {text: 'Популярное', icon: <StarBorder/>, path: '/popular',private:false},
        {text: 'Моя лента', icon: <RecentActorsOutlined/>, path: '/feed',private:true},
        {text: 'Все пользователи', icon: <UsersIcon/>, path: '/users',private:false},
        {text: 'Подписки', icon: <ListIcon/>, path: `/users/${currentUser?.id}/following`,private:true},
    ];
    const menuVariant = currentUser ? menu : menu.filter(el=>!el.private)

    return (
        <div className={styles.menu}>
            <ul>
                {menuVariant.map((obj) => (
                    <li key={obj.path}>
                        <Paper>
                            <Link href={obj.path}>
                                <a>
                                    <Button color={"primary"} variant={router.pathname === obj.path ? 'contained' : 'outlined'}>
                                        {obj.icon}
                                        {obj.text}
                                    </Button>
                                </a>
                            </Link>
                        </Paper>
                    </li>
                ))}
            </ul>
        </div>
    );
};
