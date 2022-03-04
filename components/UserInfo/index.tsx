import {Avatar, Typography} from "@mui/material";
import Link from "next/link";
import React from "react";

interface UserInfoProps {
    avatarUrl: string
    fullName: string
    id: number
    following: Array<number>
    followers: Array<number>
    about: string
    link: string
}

export const UserInfo: React.FC<UserInfoProps> = ({avatarUrl, fullName, id, following, followers, about, link}) => {
    return (
        <div className='d-flex'>
            <Avatar
                src={avatarUrl}
                style={{width: 300, height: 300, borderRadius: 6}}
            >
                {!!fullName && fullName[0]}
            </Avatar>
            <div className='mb-25 ml-20'>
                <Typography style={{fontWeight: 'bold'}} className="mt-20" variant="h4">
                    {!!fullName && fullName}
                </Typography>
                <div>
                    <div>
                        <Link href={`/users/${id}/following`}>
                            <a>
                                <b>Подписки:</b> <span>{following.length}</span>
                            </a>
                        </Link>
                    </div>
                    <div>
                        <Link href={`/users/${id}/followers`}>
                            <a>
                                <b>Подписчики:</b> <span>{followers.length}</span>
                            </a>
                        </Link>
                    </div>
                    <div>
                        <b>Обо мне:</b> <span>{about}</span>
                    </div>
                    <div>
                        <b>Ссылка:</b> <span>{link}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}