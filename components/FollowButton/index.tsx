import React, {useState} from 'react';
import styles from './FollowButton.module.scss'
import CheckIcon from '@mui/icons-material/CheckOutlined';
import AddIcon from '@mui/icons-material/AddOutlined';
import {Api} from "../../utils/api";
import {useAppSelector} from "../../redux/hooks";
import {selectUserData} from "../../redux/slices/user";
import {Button} from '@mui/material';

interface FollowButtonProps {
    id: number
}

export const FollowButton: React.FC<FollowButtonProps> = ({id}) => {
    const currentUser = useAppSelector(selectUserData)
    const [followed, setFollowed] = useState(currentUser?.following.some(el => el === id));
    const toggleFollow = () => {
        !followed ? followUser() : unfollowUser()
    }
    const unfollowUser = async () => {
        const response = await Api().users.unfollowUser({id: +id})
        setFollowed(prev => !prev)
    }
    const followUser = async () => {
        const response = await Api().users.followUser({id: +id})
        setFollowed(prev => !prev)
    }
    return (
        <div className={styles.followButton}>
            {currentUser && currentUser.id !== +id &&
                <Button onClick={toggleFollow}>
                    {!followed
                        ? <div className={styles.followButton}><span>Подписаться</span> <AddIcon/></div>
                        : <div className={styles.followButton}><span>Отписаться</span> <CheckIcon/></div>}
                </Button>}
        </div>
    )
}
