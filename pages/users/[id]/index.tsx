import Link from 'next/link';
import {Button, Paper} from '@mui/material';
import {TabContext, TabList, TabPanel} from '@mui/lab';
import Tab from '@mui/material/Tab';
import {SettingsOutlined as SettingsIcon} from '@mui/icons-material';
import {MainLayout} from '../../../layouts/MainLayout';
import {Api} from "../../../utils/api";
import {GetServerSideProps} from "next";
import {useAppSelector} from "../../../redux/hooks";
import {selectUserData} from "../../../redux/slices/user";
import {ArticleResponse, CommentResponse} from "../../../utils/api/types";
import {FollowButton} from "../../../components/FollowButton";
import {useState} from 'react';
import {CommentsList} from "../../../components/CommentsList";
import Box from '@mui/material/Box';
import {ArticlesList} from '../../../components/ArticlesList';
import {UserInfo} from "../../../components/UserInfo";

function Profile({user, comments, articles, articlesCount, commentsCount}) {

    const [tabIndex, setTabIndex] = useState('0');
    const handleChange = (event, newValue) => {
        setTabIndex(newValue);
    };
    const currentUser = useAppSelector(selectUserData)
    const requestArticles = async (take: number, currentPage: number): Promise<[Array<ArticleResponse>, number]> => {
        const [data, count] = await Api().article.getArticlesByUserId(user.id, take, currentPage)
        return [data, count]
    }
    const requestComments = async (userId: number, take: number, currentPage: number): Promise<[Array<CommentResponse>, number]> => {
        const [data, count] = await Api().comment.getCommentsByUserId(user.id, take, currentPage)
        return [data, count]
    }
    return (
        <MainLayout contentFullWidth>
            <Paper className='p-20'>
                <div className="profile">
                    <UserInfo
                        id={user.id}
                        fullName={user.fullName}
                        following={user.following}
                        followers={user.followers}
                        link={user.link}
                        about={user.about}
                        avatarUrl={user.avatarUrl}
                    />
                    <div>
                        {currentUser && user.id === currentUser.id &&
                            <div className='settings'>
                                <Link href='/users/settings'>
                                    <Button>
                                        <SettingsIcon/>
                                    </Button>
                                </Link>
                            </div>
                        }
                        {!currentUser?.id === user.id && <FollowButton id={user.id}/>}
                    </div>
                </div>
            </Paper>
            <Box>
                <TabContext value={tabIndex}>
                    <Paper>
                        <TabList onChange={handleChange} indicatorColor="primary" textColor="primary"
                                 variant="fullWidth">
                            <Tab label="Статьи" value={'0'}/>
                            <Tab label="Комментарии" value={'1'}/>
                        </TabList>
                    </Paper>
                    <TabPanel value="0">
                        <div className="d-flex align-start">
                            <div className="flex">
                                <ArticlesList
                                    articles={articles}
                                    count={articlesCount}
                                    userId={user.id}
                                    requestHandler={requestArticles}/>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value="1">
                        <CommentsList
                            requestHandler={requestComments}
                            comments={comments}
                            userId={user.id}
                            count={commentsCount}
                        />
                    </TabPanel>
                </TabContext>
            </Box>
        </MainLayout>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        const id = +ctx.params.id

        const user = await Api().users.getUserData(id)
        const [comments, commentsCount] = await Api().comment.getCommentsByUserId(id)
        const [articles, articlesCount] = await Api().article.getArticlesByUserId(id)

        return {
            props: {user, comments, articles, articlesCount, commentsCount}
        }
    } catch (e) {
        return {
            props: {},
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
}
export default Profile
