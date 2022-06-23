import {UsersList} from "../../../components/UsersList";
import {MainLayout} from "../../../layouts/MainLayout";
import {useRouter} from "next/router";
import {Api} from "../../../utils/api";

function FollowingPage({users, count, ...props}) {
    console.log(users)
    const userId = useRouter().query.id
    const requestHandler = async (take, page) => {
        return await Api().users.getFollowing(+userId, take, page)
    }
    return (
        <MainLayout>
            {!!users && count !== 0
                ? <UsersList count={count} usersList={users} requestHandler={requestHandler}/>
                : <p>Список Ваших подписок пуст</p>
            }
        </MainLayout>
    )
}

export const getServerSideProps = async (ctx) => {
    try {
        const [users, count] = await Api().users.getFollowing(ctx.query.id);
        return {
            props: {
                users,
                count
            },
        };
    } catch (err) {
        console.log(err);
        return {
            props: {
                users: null,
            },
        };

    }
};
export default FollowingPage