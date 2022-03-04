import {NextPage} from "next"
import {MainLayout} from "../../layouts/MainLayout";
import {WriteForm} from "../../components/WriteForm";
import {useAppSelector} from "../../redux/hooks";
import {selectUserData} from "../../redux/slices/user";


const WritePage: NextPage = () => {
    const currentUser = useAppSelector(selectUserData)
    return (
        <div>
            <MainLayout className='main-layout--white' hideMenu>
                {currentUser && <WriteForm/>}
            </MainLayout>
        </div>
    )
}
export default WritePage